'use strict';

var Utils = require('./utils');
var MDLHelper = require('./mdl_helper');


class LogicalInputs {
  constructor() {
    this.template = document.querySelector('#app-logical_inputs-template').content;
    this.list = document.querySelector('#app-logical_inputs-list');
    this.cardAddLogicalInput = document.querySelector('#app-logical_inputs-add');

    this.logicalInputsCount = 0;
    this.logicalInputsMaxCount = 0;
    this.schema = undefined;
  }

  //*************************************************************************
  init(params) {
    this.schema = Device.TX.getSchema();
    this._populateLogicalInputsList();

    Utils.showPage('logical_inputs');
  }

  //*************************************************************************
  back() {
    history.back();
  }

  //*************************************************************************
  add(event) {
    Utils.cancelBubble(event);
    console.log('LogicalInputs.add()')
  }

  //*************************************************************************
  editType(event) {
    Utils.cancelBubble(event);

    let index = parseInt(event.target.getAttribute('data-index'));
    console.log('LogicalInputs.editType()', index)

    let size = this.schema.LOGICAL_INPUTS.s;
    let offset = index * size;
    location.hash = Utils.buildURL(['select_single', 'TX', 'LOGICAL_INPUTS_TYPE', offset]);
  }

  //*************************************************************************
  editSubType(event) {
    Utils.cancelBubble(event);

    let index = parseInt(event.target.getAttribute('data-index'));
    console.log('LogicalInputs.editSubType()', index)

    let size = this.schema.LOGICAL_INPUTS.s;
    let offset = index * size;
    location.hash = Utils.buildURL(['select_single', 'TX', 'LOGICAL_INPUTS_SUB_TYPE', offset]);
  }

  //*************************************************************************
  editHardwareInputs(event) {
    Utils.cancelBubble(event);

    let index = parseInt(event.target.getAttribute('data-index'));
    console.log('LogicalInputs.editHardwareInputs()', index)
  }

  //*************************************************************************
  editLabels(event) {
    Utils.cancelBubble(event);

    let index = parseInt(event.target.getAttribute('data-index'));
    console.log('LogicalInputs.editLabels()', index)
  }

  //*************************************************************************
  delete(event) {
    Utils.cancelBubble(event);

    let index = parseInt(event.target.getAttribute('data-index'));
    console.log('LogicalInputs.delete()', index)
  }

  //*************************************************************************
  _populateLogicalInputsList() {
    let hardwareInputsSize = this.schema.HARDWARE_INPUTS.s;
    let logicalInputs = this.schema.LOGICAL_INPUTS;
    let logicalInputsLabels = this.schema.LOGICAL_INPUTS_LABELS;

    this.logicalInputsCount = 0;
    this.logicalInputsMaxCount = logicalInputs.c;
    let logicalInputsSize = logicalInputs.s;

    // Empty the list of mixers
    Utils.clearDynamicElements(this.list);

    let labelsSeen = [];

    for (let i = 0; i < this.logicalInputsMaxCount; i++) {
      let offset = i * logicalInputsSize;
      let type = Device.TX.getItemNumber('LOGICAL_INPUTS_TYPE', {offset: offset});

      if (type === 0) {
        continue;
      }

      let mdl = new MDLHelper('TX', {offset:  offset});
      let t = document.importNode(this.template, true);

      // Set the slider MAX to 4 if the logical input type is BCD switch
      if (type === 3) {
        t.querySelector('.app-logical_inputs-template--position_count input').setAttribute('MAX', 4);
      }

      t.querySelector('section').classList.add('can-delete');
      mdl.setTextContent('.app-logical_inputs-template--type div', 'LOGICAL_INPUTS_TYPE', t);
      mdl.setTextContent('.app-logical_inputs-template--sub_type div', 'LOGICAL_INPUTS_SUB_TYPE', t);
      mdl.setTextContent('.app-logical_inputs-template--position_count div', 'LOGICAL_INPUTS_POSITION_COUNT', t);
      mdl.setSlider('.app-logical_inputs-template--position_count input', 'LOGICAL_INPUTS_POSITION_COUNT', t);


      // Create individual <span> for the labels
      // This way we can mark duplicates
      let container = t.querySelector('.app-logical_inputs-template--labels div');
      for (let j = 0; j < logicalInputsLabels.c; j++) {
        let l = Device.TX.getItem('LOGICAL_INPUTS_LABELS', {offset: offset, index: j});
        if (l === 0) {
          break;
        }

        if (j) {
          container.appendChild(mdl.createSpan(', '));
        }

        let span = mdl.createSpan(l);

        // If the label was already used by another logical input than flag it
        if (labelsSeen.includes(l)) {
          span.classList.add('error');
        }
        labelsSeen.push(l);

        container.appendChild(span);
      }


      let firstHardwareInput = Device.TX.getItem('LOGICAL_INPUTS_HARDWARE_INPUTS', {offset: offset, index: 0});
      let firstHardwareInputType = Device.TX.getItemNumber('HARDWARE_INPUTS_TYPE', {offset: firstHardwareInput * hardwareInputsSize});
      let positionCount = Device.TX.getItem('LOGICAL_INPUTS_POSITION_COUNT', {offset: offset});

      // Create individual <span> for the hardwareInputs
      // This way we can check if they fit the type/sub-type and mark them if
      // something is wrong
      let hardwareInputsCount = Device.getNumberOfHardwareInputs(offset);
      container = t.querySelector('.app-logical_inputs-template--hardware_inputs div');
      for (let j = 0; j < hardwareInputsCount; j++) {
        let hw = Device.TX.getItem('LOGICAL_INPUTS_HARDWARE_INPUTS', {offset: offset, index: j});
        let pinName = Device.TX.getItem('HARDWARE_INPUTS_PCB_INPUT_PIN_NAME', {offset: hw * hardwareInputsSize});
        let hardwareInputType = Device.TX.getItemNumber('HARDWARE_INPUTS_TYPE', {offset: hw * hardwareInputsSize});

        if (j) {
          container.appendChild(mdl.createSpan(', '));
        }

        let span = mdl.createSpan(pinName);

        let validHardwareTypes = [];
        switch (type) {
          case 1:   // Analog logical input
            //  Analog, returns to center
            //  Analog, center detent
            //  Analog
            //  Analog, positive only
            validHardwareTypes = [1, 2, 3, 4];
            break;

          case 2:   // Switch logical input
            if (firstHardwareInputType === 7) {
              // Push-button
              validHardwareTypes = [7];
            }
            else if (positionCount === 3) {
              //  On/Off/On switch
              validHardwareTypes = [6];
            }
            else {
              //  On/Off switch
              validHardwareTypes = [5];
            }
            break;

          case 3:   // BCD Switch logical input
            //  On/Off switch
            validHardwareTypes = [5];
            break;

          case 4:   // Momentary Switch logical input
            // Push-button
            validHardwareTypes = [7];
            break;

          case 5:   // Trim logical input
            if (hardwareInputsCount === 1) {
              // Analog, center detent
              // Analog
              validHardwareTypes = [2, 3];
            }
            else {
              // Push-button
              validHardwareTypes = [7];
            }
            break;
        }

        if (! validHardwareTypes.includes(hardwareInputType)) {
          span.classList.add('error');
        }

        container.appendChild(span);
      }



      // Show subtype only if type==switch and firstHardwareInputType==Monentary
      Utils.setVisibility('.app-logical_inputs-template--sub_type', type === 2 && firstHardwareInputType === 7, t);
      // Show position count only if type==switch or type==BCD
      Utils.setVisibility('.app-logical_inputs-template--position_count', (type === 2 || type === 3), t);

      // Set the id and for attributes for all labels in the card
      mdl.setAttribute('.app-logical_inputs-template--labels div', 'id', 'app-logical_inputs--labels' + i, t);
      mdl.setAttribute('.app-logical_inputs-template--labels label', 'for', 'app-logical_inputs--labels' + i, t);
      mdl.setAttribute('.app-logical_inputs-template--position_count div', 'id', 'app-logical_inputs--position_count' + i, t);
      mdl.setAttribute('.app-logical_inputs-template--position_count label', 'for', 'app-logical_inputs--position_count' + i, t);
      mdl.setAttribute('.app-logical_inputs-template--type div', 'id', 'app-logical_inputs--type' + i, t);
      mdl.setAttribute('.app-logical_inputs-template--type label', 'for', 'app-logical_inputs--type' + i, t);
      mdl.setAttribute('.app-logical_inputs-template--sub_type div', 'id', 'app-logical_inputs--sub_type' + i, t);
      mdl.setAttribute('.app-logical_inputs-template--sub_type label', 'for', 'app-logical_inputs--sub_type' + i, t);
      mdl.setAttribute('.app-logical_inputs-template--hardware_inputs div', 'id', 'app-logical_inputs--sub_type' + i, t);
      mdl.setAttribute('.app-logical_inputs-template--hardware_inputs label', 'for', 'app-logical_inputs--sub_type' + i, t);

      // Let the button handler know which logical input index the card belongs to
      mdl.setAttribute('.app-logical_inputs-template--labels button', 'data-index', i, t);
      mdl.setAttribute('.app-logical_inputs-template--type button', 'data-index', i, t);
      mdl.setAttribute('.app-logical_inputs-template--sub_type button', 'data-index', i, t);
      mdl.setAttribute('.app-logical_inputs-template--hardware_inputs button', 'data-index', i, t);
      mdl.setAttribute('.app-logical_inputs-template--delete button', 'data-index', i, t);

      this.list.insertBefore(t, this.cardAddLogicalInput);
      ++this.logicalInputsCount;
    }

    // Show the Add Logical Input card only if there are available slots
    Utils.setVisibility('#app-logical_inputs-add', this.logicalInputsCount < this.logicalInputsMaxCount);
  }
}

window['LogicalInputs'] = new LogicalInputs();

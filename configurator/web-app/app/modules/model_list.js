'use strict';

var Utils = require('./utils');
var MDLHelper = require('./mdl_helper');
var DatabaseObject = require('./database_object');


class ModelList {
  constructor() {
    this.list = document.querySelector('#app-model_list-list');
    this.add = document.querySelector('#app-model_list-add');
    this.container = document.querySelector('#app-model_list-list__container');
    this.template = document.querySelector('#app-model_list-list__template').content;
    this.loading = document.querySelector('#app-model_list-loading_model');
    this.listLoading = document.querySelector('#app-model_list-loading_list');
    this.name = document.querySelector('#app-model_list-loading_model__name');
    this.progress = document.querySelector('#app-model_list-loading_model__progress');
    this.snackbarMessage = document.querySelector('#app-model_list-snackbar__message').content.textContent;
    this.snackbarActionText = document.querySelector('#app-model_list-snackbar__action_text').content.textContent;

    this.tx = undefined;
    this.models = [];
  }

  //*************************************************************************
  init(params) {
    // If we are called to select a model to load to the transmitter then hide
    // the 'add model' functionality
    this.tx = params.tx;
    this.models = [];

    this._updateItemVisibility();
    Utils.show(this.listLoading);
    Utils.hide(this.list);
    Utils.hide(this.add);
    Utils.hide(this.loading);
    Utils.clearDynamicElements(this.list);

    Database.listEntries(this._databaseCallback.bind(this));
    Utils.showPage('model_list');
  }

  //*************************************************************************
  back() {
    history.back();
  }

  //*************************************************************************
  createModel(event) {
    Utils.cancelBubble(event);

    let configVersion = 1;
    let newModel = Device.makeNewDevice(configVersion, 'MODEL');

    newModel.setItem('RF_PROTOCOL_HK310_ADDRESS', Utils.newRandomAddress());
    newModel.setItem('RF_PROTOCOL_HK310_HOP_CHANNELS', RFProtocol.newHopChannels());

    // Load useful values for limits
    let limitCount = newModel.getSchema().LIMITS.c;
    let limitSize = newModel.getSchema().LIMITS.s;
    for (let i = 0; i < limitCount; i++) {
      newModel.setItem('LIMITS_EP_L', -10000, {offset: i * limitSize});
      newModel.setItem('LIMITS_EP_H', 10000, {offset: i * limitSize});
      newModel.setItem('LIMITS_LIMIT_L', -15000, {offset: i * limitSize});
      newModel.setItem('LIMITS_LIMIT_H', 15000, {offset: i * limitSize});
    }

    // Load a basic mixer (car with steering and throttle)
    let mixerUnitSize = newModel.getSchema().MIXER_UNITS.s;
    let offset = 0;
    newModel.setItem('MIXER_UNITS_SRC', 'ST', {offset: offset});
    newModel.setItem('MIXER_UNITS_DST', 'CH1', {offset: offset});
    newModel.setItem('MIXER_UNITS_SCALAR', 100, {offset: offset});
    newModel.setItem('MIXER_UNITS_APPLY_TRIM', 1, {offset: offset});
    offset += mixerUnitSize;
    newModel.setItem('MIXER_UNITS_SRC', 'TH', {offset: offset});
    newModel.setItem('MIXER_UNITS_DST', 'CH2', {offset: offset});
    newModel.setItem('MIXER_UNITS_SCALAR', 100, {offset: offset});
    newModel.setItem('MIXER_UNITS_APPLY_TRIM', 1, {offset: offset});
    offset += mixerUnitSize;
    newModel.setItem('MIXER_UNITS_SRC', 'AUX', {offset: offset});
    newModel.setItem('MIXER_UNITS_DST', 'CH3', {offset: offset});
    newModel.setItem('MIXER_UNITS_SCALAR', 100, {offset: offset});
    newModel.setItem('MIXER_UNITS_APPLY_TRIM', 1, {offset: offset});

    Device.MODEL = newModel;
    location.hash = Utils.buildURL(['model_details']);
  }

  //*************************************************************************
  editModel(element) {
    let index = element.getAttribute('data-index');

    Database.getEntry(this.models[index].uuid, function (data) {
      Device.MODEL = new DatabaseObject(data);
      location.hash = Utils.buildURL(['model_details']);
    });
  }

  //*************************************************************************
  loadModel(element) {
    let index = element.getAttribute('data-index');
    console.log('loadModel', index, Device.MODEL, this.models[index].uuid);

    // If the same model as the currently loaded one is selected then ignore
    // the request and return to model_details
    // if (Device.MODEL  &&  Device.MODEL.uuid === this.models[index].uuid) {
    //   history.back();
    //   return;
    // }

    // Show loading indicator
    Utils.hide(this.list);
    Utils.show(this.loading);
    this.progress.classList.add('mdl-progress--indeterminate');
    this.name.textContent = this.models[index].name;


    // Set a new random address so that while we are downloading the new
    // model data, the current model does not see all the values which may
    // cause it to run off or misbehave otherwise.
    // Since the address is last in the model configuration, this temporary
    // address gets overwritten once we downloaded all model data
    let address = Utils.newRandomAddress();
    Device.MODEL.setItem('RF_PROTOCOL_HK310_ADDRESS', address, {preview: true});


    let uuid = this.models[index].uuid;
    let newModel;

    new Promise((resolve, reject) => {
      Database.getEntry(uuid, data => {
        if (!data) {
          reject(new Error('loadModel: Model not in database?!'));
          return;
        }
        resolve(new DatabaseObject(data));
      });
    }).then(dbentry => {
      newModel = dbentry;
      let offset = newModel.getSchema().o;
      return Device.write(offset, newModel.data);
    }).then(() => {
      Device.MODEL = newModel;

      // Note: we have changed the model, so the URL UUID will be wrong.
      // We pop one item from the history, but immediately replace the
      // location hash with the new URL. This way the back button works
      // despite that we create a loop
      history.back();
      history.replaceState(null, '', Utils.buildURL(['model_details']));
    }).catch(error => {
      console.log(error);
    });
  }

  //*************************************************************************
  deleteModel(model) {
    Device.UNDO = model;
    Database.deleteEntry(model);

    let data = {
      message: this.snackbarMessage,
      timeout: 5000,
      actionHandler: this._undoDeleteModel.bind(this),
      actionText: this.snackbarActionText
    };
    Utils.showSnackbar(data);
  }

  //*************************************************************************
  _databaseCallback(cursor) {
    // console.log(cursor)
    if (cursor) {
      let data = cursor.value;
      if (data.schemaName === 'MODEL') {
        let model = new DatabaseObject(data);
        this.models.push({
          name: model.getItem('NAME'),
          tag: model.getItem('TAG'),
          uuid: data.uuid
        });
      }
      cursor.continue();
    }
    else {
      this._updateModelList();
    }
  }

  //*************************************************************************
  _updateModelList() {
    // Sort models[] by name
    this.models.sort((a, b) => {
      return (a.name < b.name) ? -1 : 1;
    });

    let mdl = new MDLHelper('MODEL');

    Utils.clearDynamicElements(this.list);

    for (let i = 0; i < this.models.length; i++) {
      let t = document.importNode(this.template, true);
      t.querySelector('button.app-model_list--load').setAttribute('data-index', i);
      t.querySelector('button.app-model_list--edit').setAttribute('data-index', i);
      mdl.setTextContentRaw('.app-model_list-list__template-name', this.models[i].name, t);
      mdl.setIcon('.app-model_list-list__template-icon', this.models[i].tag, t);

      this.container.appendChild(t);
    }

    Utils.hide(this.listLoading);
    Utils.show(this.add);
    if (this.models.length !==  0) {
      Utils.show(this.list);
    }

    this._updateItemVisibility();
  }

  //*************************************************************************
  _updateItemVisibility() {
    Utils.setVisibility('.app-model_list--load', this.tx);
    Utils.setVisibility('.app-model_list--edit', !this.tx);
  }

  //*************************************************************************
  _undoDeleteModel() {
    if (!Device.UNDO) {
      return;
    }

    Device.MODEL = Device.UNDO;
    Database.setEntry(Device.MODEL);

    Utils.cancelSnackbar();

    location.hash = Utils.buildURL(['model_details']);
  }
}

window['ModelList'] = new ModelList();

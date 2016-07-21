# Configurator UI

- *Not connected* (default)
    - *Main screen*:
        - Large connect button
        - Drawer:
            - Models
                - Show *Model list*
            - Transmitters
                - Show *Transmitter list*

    - *Model list*:
        - List of cards, one for each model
            - If card is selected: Show *Model details*
                - *Model details*:
                    - View where the user can edit the following elements:
                        - Name
                        - Mixers and limits; If selected: Show *Mixer*
                            - *Mixer*:
                                - Show mixer units in sequence, their input and output channels
                                    - Select mixer unit: Show *Mixer unit*:
                                        - *Mixer unit*:
                                            - Source (button -> *single selection page*)
                                            - Invert source (on/off switch)
                                            - Destination (button -> *single selection page*)
                                            - Curve (*custom element* -> *curve editing page*)
                                            - Switch (*custom element* -> *page to edit label, comparison, value*)
                                            - Operation (button -> *single selection page*)
                                            - Apply trim (on/off switch)
                                    - Select output channel: Show *Limits*:
                                        - *Limits*:
                                            - EP left (slider)
                                            - EP right (slider)
                                            - Subtrim (slider)
                                            - Limit left (slider)
                                            - Limit right (slider)
                                            - Failsafe (slider)
                                            - Speed (slider)
                                            - Invert (on/off switch)
                                - Back: Show *Model details*
                                - Context menu: Add mixer unit
                                - **FIXME need a way to delete mixer units**
                                    - Swipe out?
                                    - Swipe onto trashbin icon that appears while dragging?
                                    - Context menu while in *Mixer unit*?
                                - **FIXME need a way to re-arrange mixer units**
                                    - Drag-and-drop?
                        - RF Protocol; If selected: Show *RF protocol details*
                            - *RF protocol details*:
                                - RF protocol editing: depends on protocol! Adress, Hop channels
                                - Back: Show *Model details*
                    - Back: Show *Model list*
                    - Context menu: Delete model
        - Back: Show Main screen
        - Context menu: Add model

    - *Transmitter list*
        - List of cards, one for each transmitter
            - If card is selected: Show *Transmitter details*
                - *Transmitter details*:
                    - Tabs: *Hardware inputs*, *Logical inputs*, *Name*
                        - *Hardware inputs*:
                            - List of cards, one for each hardware input
                                - Unused hardware inputs are shown such
                                - Select pcb input (determines possible types!) (button -> *single selection page*)
                                - Select type (button -> *single selection page*)
                                - **FIXME**: how to do calibration?
                        - *Logical inputs*:
                            - List of cards, one for each logical input
                                - Unused logical inputs are hidden; last entry is "add new logical input"
                                - Select type (and subtype if type is momentary) (button -> *single selection page*)
                                - Select number of switch positions if type is switch (slider)
                                - Select or Add/Remove Hardware inputs, depending on type (button -> *multiple selection page*)
                                - Add/Remove labels (button -> *multiple selection page*)
                    - Back: Show *Transmitter list*
                    - Context menu: Delete transmitter
        - Back: Show *Main screen*

- *Connected*
    - Header:
        - Show transmitter name and colored dot with connection state
        - Back: Disconnect; need a prompt?
        - Context menu:
            - Change model
                * Show same view as *Model list* but different behaviour
            - Configure transmitter
                - Show *Transmitter details*
            - Disconnect?
    - Same view as *Model details*
        - Show live bars of the various channels/mixers/outputs


**FIXME: show TX battery state**
**FIXME: slider from MDL are not what we need: no 0 point marker, do not go dim when set to the left**
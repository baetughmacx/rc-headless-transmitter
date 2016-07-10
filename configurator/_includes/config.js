var CONFIG = {
    o: 0, s: 4604, c: 1, t: 's',
    VERSION: {o: 0, s: 4, c: 1, t: 'u'},
    TX: {o: 4, s: 1716, c: 1, t: 's'},
    MODEL: {o: 1720, s: 2884, c: 1, t: 's'},
};

var TX = {
    o: 0, s: 1716, c: 1, t: 's',
    UUID: {o: 0, s: 1, c: 16, t: 'uuid'},
    NAME: {o: 16, s: 1, c: 16, t: 'c'},
    HARDWARE_INPUTS: {o: 32, s: 32, c: 32, t: 's'},
    HARDWARE_INPUTS_PCB_INPUT: {o: 32, s: 24, c: 1, t: 's'},
    HARDWARE_INPUTS_PCB_INPUT_GPIOPORT: {o: 32, s: 4, c: 1, t: 'u'},
    HARDWARE_INPUTS_PCB_INPUT_GPIO: {o: 36, s: 2, c: 1, t: 'u'},
    HARDWARE_INPUTS_PCB_INPUT_ADC_CHANNEL: {o: 38, s: 1, c: 1, t: 'u'},
    HARDWARE_INPUTS_PCB_INPUT_TYPE: {o: 39, s: 1, c: 1, t: 'pcb_input_type_t'},
    HARDWARE_INPUTS_PCB_INPUT_PIN_NAME: {o: 40, s: 1, c: 10, t: 'c'},
    HARDWARE_INPUTS_PCB_INPUT_SCHEMATIC_REFERENCE: {o: 50, s: 1, c: 6, t: 'c'},
    HARDWARE_INPUTS_TYPE: {o: 56, s: 1, c: 1, t: 'hardware_input_type_t'},
    HARDWARE_INPUTS_CALIBRATION: {o: 58, s: 2, c: 3, t: 'u'},
    LOGICAL_INPUTS: {o: 1056, s: 20, c: 32, t: 's'},
    LOGICAL_INPUTS_TYPE: {o: 1056, s: 1, c: 1, t: 'input_type_t'},
    LOGICAL_INPUTS_SUB_TYPE: {o: 1057, s: 1, c: 1, t: 'input_sub_type_t'},
    LOGICAL_INPUTS_POSITION_COUNT: {o: 1058, s: 1, c: 1, t: 'u'},
    LOGICAL_INPUTS_HARDWARE_INPUTS: {o: 1059, s: 1, c: 12, t: 'u'},
    LOGICAL_INPUTS_LABELS: {o: 1071, s: 1, c: 5, t: 'label_t'},
    TRIM_RANGE: {o: 1696, s: 4, c: 1, t: 'i'},
    TRIM_STEP_SIZE: {o: 1700, s: 4, c: 1, t: 'i'},
    BIND_TIMEOUT_MS: {o: 1704, s: 4, c: 1, t: 'u'},
    DOUBLE_CLICK_TIMEOUT_MS: {o: 1708, s: 4, c: 1, t: 'u'},
    LED_PWM_PERCENT: {o: 1712, s: 1, c: 1, t: 'u'},
};

var MODEL = {
    o: 0, s: 2884, c: 1, t: 's',
    UUID: {o: 0, s: 1, c: 16, t: 'uuid'},
    NAME: {o: 16, s: 1, c: 16, t: 'c'},
    MIXER_UNITS: {o: 32, s: 26, c: 100, t: 's'},
    MIXER_UNITS_CURVE: {o: 32, s: 15, c: 1, t: 's'},
    MIXER_UNITS_CURVE_TYPE: {o: 32, s: 1, c: 1, t: 'curve_type_t'},
    MIXER_UNITS_CURVE_SMOOTHING: {o: 33, s: 1, c: 1, t: 'interpolation_type_t'},
    MIXER_UNITS_CURVE_POINTS: {o: 34, s: 13, c: 1, t: 'i'},
    MIXER_UNITS_SRC: {o: 47, s: 1, c: 1, t: 'label_t'},
    MIXER_UNITS_DST: {o: 48, s: 1, c: 1, t: 'label_t'},
    MIXER_UNITS_SW: {o: 49, s: 3, c: 1, t: 's'},
    MIXER_UNITS_SW_SW: {o: 49, s: 1, c: 1, t: 'u'},
    MIXER_UNITS_SW_CMP: {o: 50, s: 1, c: 1, t: 'comparison_t'},
    MIXER_UNITS_SW_VALUE: {o: 51, s: 1, c: 1, t: 'u'},
    MIXER_UNITS_OP: {o: 52, s: 1, c: 1, t: 'operation_type_t'},
    MIXER_UNITS_SCALAR: {o: 53, s: 1, c: 1, t: 'i'},
    MIXER_UNITS_OFFSET: {o: 54, s: 1, c: 1, t: 'i'},
    MIXER_UNITS_TAG: {o: 55, s: 1, c: 1, t: 'u'},
    MIXER_UNITS_INVERT_SOURCE: {o: 56, s: 1, c: 1, t: 'u'},
    MIXER_UNITS_APPLY_TRIM: {o: 57, s: 1, c: 1, t: 'u'},
    LIMITS: {o: 2632, s: 28, c: 8, t: 's'},
    LIMITS_EP_L: {o: 2632, s: 4, c: 1, t: 'i'},
    LIMITS_EP_R: {o: 2636, s: 4, c: 1, t: 'i'},
    LIMITS_SUBTRIM: {o: 2640, s: 4, c: 1, t: 'i'},
    LIMITS_LIMIT_L: {o: 2644, s: 4, c: 1, t: 'i'},
    LIMITS_LIMIT_H: {o: 2648, s: 4, c: 1, t: 'i'},
    LIMITS_FAILSAFE: {o: 2652, s: 4, c: 1, t: 'i'},
    LIMITS_SPEED: {o: 2656, s: 1, c: 1, t: 'u'},
    LIMITS_INVERT: {o: 2657, s: 1, c: 1, t: 'u'},
    RF_PROTOCOL_TYPE: {o: 2856, s: 1, c: 1, t: 'rf_protocol_type_t'},
    RF: {o: 2857, s: 25, c: 1, t: 's'},
    RF_PROTOCOL_HK310: {o: 2857, s: 25, c: 1, t: 's'},
    RF_PROTOCOL_HK310_HOP_CHANNELS: {o: 2857, s: 1, c: 20, t: 'u'},
    RF_PROTOCOL_HK310_ADDRESS: {o: 2877, s: 1, c: 5, t: 'u'},
};

var TYPES = {
    pcb_inputut_type_t: {
        PCB_INPUT_NOT_USED: 0,
        ANALOG_DIGITAL: 1,
        DIGITAL: 2,
    },
    hardware_input_type_t: {
        TRANSMITTER_INPUT_NOT_USED: 0,
        ANALOG_WITH_CENTER: 1,
        ANALOG_NO_CENTER: 2,
        ANALOG_NO_CENTER_POSITIVE_ONLY: 3,
        SWITCH_ON_OFF: 4,
        SWITCH_ON_OPEN_OFF: 5,
        MOMENTARY_ON_OFF: 6,
    },
    input_type_t: {
        LOGICAL_INPUT_NOT_USED: 0,
        ANALOG: 1,
        SWITCH: 2,
        BCD_SWITCH: 3,
        MOMENTARY: 4,
        TRIM: 5,
    },
    input_sub_type_t: {
        SUB_TYPE_NOT_APPLICABLE: 0,
        UP_DOWN_BUTTONS: 1,
        INCREMENT_AND_LOOP: 2,
        DECREMENT_AND_LOOP: 3,
        SAW_TOOTH: 4,
        DOUBLE_CLICK_DECREMENT: 5,
    },
    label_t: {
        NONE: 0,
        ST: 1,
        TH: 2,
        THR: 3,
        RUD: 4,
        AIL: 5,
        ELE: 6,
        AUX: 7,
        ST_DR: 8,
        RUD_DR: 9,
        AIL_DR: 10,
        ELE_DR: 11,
        TH_DR: 12,
        THR_DR: 13,
        TH_HOLD: 14,
        GEAR: 15,
        FLAPS: 16,
        TRAINER: 17,
        SIDE_L: 18,
        SIDE_R: 19,
        POT1: 20,
        POT2: 21,
        POT3: 22,
        POT4: 23,
        POT5: 24,
        POT6: 25,
        POT7: 26,
        POT8: 27,
        POT9: 28,
        SW1: 29,
        SW2: 30,
        SW3: 31,
        SW4: 32,
        SW5: 33,
        SW7: 35,
        SW8: 36,
        SW9: 37,
        CH1: 38,
        CH2: 39,
        CH3: 40,
        CH4: 41,
        CH5: 42,
        CH6: 43,
        CH7: 44,
        CH8: 45,
        VIRTUAL1: 46,
        VIRTUAL2: 47,
        VIRTUAL3: 48,
        VIRTUAL4: 49,
        VIRTUAL5: 50,
        VIRTUAL6: 51,
        VIRTUAL7: 52,
        VIRTUAL8: 53,
        VIRTUAL9: 54,
        VIRTUAL10: 55,
        OUTPUT_CHANNEL_TAG_OFFSET: 38,
    },
    rf_protocol_type_t: {
        RF_PROTOCOL_HK310: 0,
    },
    operation_type_t: {
        OP_REPLACE: 0,
        OP_ADD: 1,
        OP_MULTIPLY: 2,
        OP_MIN: 3,
        OP_MAX: 4,
    },
    comparison_t: {
        EQUAL: 0,
        NON_EQUAL: 1,
        GREATER: 2,
        GREATER_OR_EQUAL: 3,
        SMALLER: 4,
        SMALLER_OR_EQUAL: 5,
    },
    curve_type_t: {
        CURVE_NONE: 0,
        CURVE_FIXED: 1,
        CURVE_MIN_MAX: 2,
        CURVE_ZERO_MAX: 3,
        CURVE_GT_ZERO: 4,
        CURVE_LT_ZERO: 5,
        CURVE_ABSVAL: 6,
        CURVE_EXPO: 7,
        CURVE_DEADBAND: 8,
        CURVE_3POINT: 9,
        CURVE_5POINT: 10,
        CURVE_7POINT: 11,
        CURVE_9POINT: 12,
        CURVE_11POINT: 13,
        CURVE_13POINT: 14,
    },
    interpolation_type_t: {
        INTERPOLATION_LINEAR: 0,
        INTERPOLATION_SMOOTHING: 1,
    },
};

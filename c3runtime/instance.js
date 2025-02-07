"use strict";

{
    globalThis.C3.Plugins.Massive_Cube_NumeralJS.Instance = class NumeralJSInstance extends globalThis.ISDKInstanceBase {
        constructor() {
            super();

            const properties = this._getInitProperties();
            //if (properties)	{	}
            this.numrr = window["numeral"];
        }

        _release() {
            super._release();
        }

        _saveToJson() {
            return {};
        }

        _loadFromJson(o) {

        }
    };
}
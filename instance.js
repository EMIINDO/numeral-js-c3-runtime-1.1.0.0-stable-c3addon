"use strict";

{
    const SDK = globalThis.SDK;
    const PLUGIN_CLASS = SDK.Plugins.Massive_Cube_NumeralJS;

    PLUGIN_CLASS.Instance = class NumeralJSInstance extends SDK.IInstanceBase {
        constructor(sdkType, inst) {
            super(sdkType, inst);
        }

        Release() {
        }

        OnCreate() {
        }

        OnPropertyChanged(id, value) {
        }

        LoadC2Property(name, valueString) {
            return false;		// not handled
        }
    };
}
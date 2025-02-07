"use strict";

{
    const SDK = globalThis.SDK;
    const PLUGIN_CLASS = SDK.Plugins.Massive_Cube_NumeralJS;

    PLUGIN_CLASS.Type = class NumeralJSType extends SDK.ITypeBase {
        constructor(sdkPlugin, iObjectType) {
            super(sdkPlugin, iObjectType);
        }
    };
}
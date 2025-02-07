"use strict";
// Porting BY EMI INDO with c3addon-ide-plus

{

    ////////////////////////////////////////////
    const PLUGIN_ID = "Massive_Cube_NumeralJS";
    ////////////////////////////////////////////

    // callMap Deprecated const PLUGIN_VERSION = "1.1.0.0";
    const PLUGIN_CATEGORY = "general";

    async function HandleDataInMyFormat(droppedFileName, zipFile, opts) {

        const entry = zipFile.GetEntry("data.json");
        if (!entry)
            return false;

        const json = await zipFile.ReadJson(entry);
        if (!json["is-my-custom-format"])
            return false;
        const promises = [];

        for (const spriteData of json["sprites"]) {
            promises.push(ImportSpriteData(zipFile, opts, spriteData));
        }

        await Promise.all(promises);

        return true;
    }

    async function ImportSpriteData(zipFile, opts, spriteData) {

        const layoutView = opts.layoutView;
        const project = layoutView.GetProject();
        const layoutX = opts.layoutX;
        const layoutY = opts.layoutY;

        const filename = spriteData["file"];
        const x = layoutX + spriteData["offsetX"];
        const y = layoutY + spriteData["offsetY"];
        const width = spriteData["width"];
        const height = spriteData["height"];
        const angle = spriteData["angle"] * (Math.PI / 180);

        const imageEntry = zipFile.GetEntry(filename);
        if (!imageEntry)
            return;

        const imageBlob = await zipFile.ReadBlob(imageEntry);

        const name = filename.split(".")[0];
        const objectType = await project.CreateObjectType("Sprite", name);

        const animations = objectType.GetAnimations();
        const firstAnim = animations[0];
        const frames = firstAnim.GetFrames();
        const firstFrame = frames[0];

        await firstFrame.ReplaceBlobAndDecode(imageBlob);

        const wi = objectType.CreateWorldInstance(layoutView.GetActiveLayer());
        wi.SetXY(x, y);
        wi.SetSize(width, height);
        wi.SetAngle(angle);
    }

    const SDK = globalThis.SDK;
    const PLUGIN_CLASS = SDK.Plugins.Massive_Cube_NumeralJS = class NumeralJSPlugin extends SDK.IPluginBase {
        constructor() {
            super(PLUGIN_ID);

            SDK.Lang.PushContext("plugins." + PLUGIN_ID.toLowerCase());

            this._info.SetName(globalThis.lang(".name"));
            this._info.SetDescription(globalThis.lang(".description"));
            // callMap Deprecated this._info.SetVersion(PLUGIN_VERSION);
            this._info.SetCategory(PLUGIN_CATEGORY);
            this._info.SetAuthor("Massive_Cube");
            this._info.SetHelpUrl(globalThis.lang(".help-url"));
            this._info.SetRuntimeModuleMainScript("c3runtime/main.js");
            this._info.SetIsSingleGlobal(true);

            this._info.SetSupportedRuntimes(["c3"]);

            SDK.Lang.PushContext(".properties");

            this._info.SetProperties([]);

            this._info.AddFileDependency({
                filename: "c3runtime/numeral.min.js",
                type: "external-script"
            });

            this._info.AddFileDependency({
                filename: "c3runtime/locales.min.js",
                type: "external-script"
            });

            SDK.Lang.PopContext();
            SDK.Lang.PopContext();

            SDK.UI.Util.AddDragDropFileImportHandler(HandleDataInMyFormat, {
                isZipFormat: true,
                toLayoutView: true
            });
        }
    };

    PLUGIN_CLASS.Register(PLUGIN_ID, PLUGIN_CLASS);
}
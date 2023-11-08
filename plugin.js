"use strict";

{
  const PLUGIN_ID = "Twine";
  const PLUGIN_VERSION = "2.0.0.0";
  const PLUGIN_CATEGORY = "general";

  const PLUGIN_CLASS = (SDK.Plugins.Twine = class TwinePlugin extends (
    SDK.IPluginBase
  ) {
    constructor() {
      super(PLUGIN_ID);
      SDK.Lang.PushContext("plugins." + PLUGIN_ID.toLowerCase());

			this._info.SetName(lang(".name"));
      this._info.SetDescription(lang(".description"));
      this._info.SetVersion(PLUGIN_VERSION);
      this._info.SetCategory(PLUGIN_CATEGORY);
      this._info.SetAuthor("Colludium - ported by LYSDEN.art");
      this._info.SetHelpUrl(lang(".help-url"));
      this._info.SetIsSingleGlobal(true);
      this._info.SetSupportsEffects(false);
      this._info.SetMustPreDraw(false);
      this._info.SetCanBeBundled(false);

      SDK.Lang.PushContext(".properties");
      this._info.SetProperties([]);

			SDK.Lang.PopContext();
    }
  });
  PLUGIN_CLASS.Register(PLUGIN_ID, PLUGIN_CLASS);
}

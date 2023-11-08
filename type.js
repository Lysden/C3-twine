'use strict';

{
	const PLUGIN_CLASS = SDK.Plugins.Twine;

	PLUGIN_CLASS.Type = class TwineType extends SDK.ITypeBase
	{
		constructor(sdkPlugin, iObjectType)
		{
			super(sdkPlugin, iObjectType);
		}
	};
}

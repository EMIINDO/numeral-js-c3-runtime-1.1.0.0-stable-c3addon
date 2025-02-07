"use strict";

{
	globalThis.C3.Plugins.Massive_Cube_NumeralJS.Exps =
	{
		
		numeral(numOrString)
		{
			var num = this.numrr(numOrString);
			return num["value"]();
		},
		format(numOrStr,vForm)
		{
			return this.numrr(numOrStr)["format"](vForm);
		},
		getdifference(firstVal,secVal)
		{
			var number = this.numrr(firstVal),	value = secVal;
			return number["difference"](value);
		}
	};
}
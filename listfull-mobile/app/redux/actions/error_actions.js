import * as Types from './../constants/types.js';

export const resetErrors = () => ({
	type: Types.RESET_ERRORS,
});

export const enableShowErrors = () => ({
	type: Types.SHOW_ERRORS,
});

export const disableShowErrors = () => ({
	type: Types.HIDE_ERRORS,
});



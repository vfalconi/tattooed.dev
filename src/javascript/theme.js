import { LitElement, html, css, map } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/all/lit-all.min.js';

class HexColor {
	constructor(strColor) {
		this.value = this.findColorspace(strColor);
	}

	toString() {
		return this.value;
	}

	findColorspace(str) {
		if (str.indexOf('hsl') === 0) {
			return this.fromHSL(str);
		} else if (str.indexOf('rgb') === 0) {
			return this.fromRGB(str);
		} else {
			return str;
		}
	}

	formatHex(vals) {
		const hexVals = [...vals].map(v => {
			if (v.length == 1) {
				return `0${v}`;
			}
			return v;
		})

		return `#${hexVals.join('')}`;
	}

	rgbChannelToHex(channel) {
		return Math.round(channel * 255).toString(16);
	}

	getValues(str) {
		const sep = (str.indexOf(',') > -1 ? ',' : ' ');
		const open = str.indexOf('(') + 1;
		const close = str.indexOf(')');
		const values = str.slice(open, close).split(sep).map(v => v.trim());
		return values;
	}

	fromRGB(rgb) {
		const channels = this.getValues(rgb);

		let r = (+channels[0]).toString(16);
		let g = (+channels[1]).toString(16);
		let b = (+channels[2]).toString(16);

		return this.formatHex([ r, g, b ]);
	}

	fromHSL(hsl) {
		const channels = this.getValues(hsl)

		let h = channels[0];
		let s = channels[1].substr(0,channels[1].length - 1) / 100;
		let l = channels[2].substr(0,channels[2].length - 1) / 100;


		if (h.indexOf('deg') > -1) {
			h = h.substr(0,h.length - 3);
		} else if (h.indexOf('rad') > -1) {
			h = Math.round(h.substr(0,h.length - 3) * (180 / Math.PI));
		} else if (h.indexOf('turn') > -1) {
			h = Math.round(h.substr(0,h.length - 4) * 360);
		}

		if (h >= 360) {
			h %= 360;
		}

		let c = (1 - Math.abs(2 * l - 1)) * s;
		let x = c * (1 - Math.abs((h / 60) % 2 - 1));
		let m = l - c/2;
		let r = 0;
		let g = 0;
		let b = 0;

		if (0 <= h && h < 60) {
			r = c; g = x; b = 0;
		} else if (60 <= h && h < 120) {
			r = x; g = c; b = 0;
		} else if (120 <= h && h < 180) {
			r = 0; g = c; b = x;
		} else if (180 <= h && h < 240) {
			r = 0; g = x; b = c;
		} else if (240 <= h && h < 300) {
			r = x; g = 0; b = c;
		} else if (300 <= h && h < 360) {
			r = c; g = 0; b = x;
		}
		// Having obtained RGB, convert channels to hex
		r = this.rgbChannelToHex((r + m));
		g = this.rgbChannelToHex((g + m));
		b = this.rgbChannelToHex((b + m));

		return this.formatHex([ r, g, b ]);
	}
}

export class ThemeUIColorSelect extends LitElement {
	constructor() {
		super();
		this.value = '';
		this.currentValue = '';
		this.defaultValue = '';
		this.presets = '';
	}

	static properties = {
    label: { attribute: true },
		value: { attribute: true },
		currentValue: { attribute: true, },
		defaultValue: { attribute: true, },
		presets: { attribute: true },
  };

	static styles = css`
		label {
			font-family: monospace;
			flex: 1 1 50%;
		}

		input[type="color"] {
			flex: 1 1 50%;
		}

		.setting-picker {
			display: flex;
			justify-content: space-between;
			gap: 1rem;
			margin-bottom: .5rem;
			padding-bottom: .5rem;
			border-bottom: 2px solid var(--black);
		}
	`;

	handleColorChange(event) {
		const selectedValue = event.target.value;

		this.value = selectedValue;
	}

	setColorInputValue(colorValue) {
		this.renderRoot.querySelector('input[type="color"]').value = colorValue;
	}

	handleReset(event) {
		this.setColorInputValue(this.currentValue);
	}

	handleDefault(event) {
		this.setColorInputValue(this.defaultValue);
	}

	render() {
		return html`
			<div class="setting-picker">
				<label for="${this.label}">${this.label}</label>
				<input
					id="${this.label}"
					name="${this.label}"
					@change="${this.handleColorChange}"
					list="color-presets"
					aria-label="${this.label} custom color value"
					type="color"
					value="${this.currentValue}" />
				<datalist id="color-presets">
					${map(this.presets.split(';').map(p => p.split(':')), (p) => {
						const [ label, value ] = [...p];
						return html`<option value="${value}">${label}</option>`
					})}
				</datalist>
				<button @click="${this.handleReset}" type="button" name="reset">Reset</button>
				<button @click="${this.handleDefault}" type="button" name="default">Default</button>
			</div>
		`
	}
}

export class ThemeUI extends LitElement {
	constructor() {
		const themeRules = [];
		super();
		this.documentProperties = this.getCSSCustomPropIndex();
		this.currentTheme = new Map();
		for (let i = 0; i < window.localStorage.length; i++) {
			const key = window.localStorage.key(i);
			const item = window.localStorage.getItem(key);
			if (item && key.startsWith('theme_')) {
				this.currentTheme.set(key, item);
				themeRules.push(`--${key}:${item}`);
			}
		}

		document.styleSheets[1].insertRule(`:root{${themeRules.join(';')}}`);
	}

	themeProperties = [
		[ 'quoteBorder', 'var(--greenYellow)' ],
		[ 'blogFooterBG', 'var(--darkBlue)' ],
		[ 'blogFooterColor', '#fff' ],
		[ 'blogFooterBorder', 'var(--yellowGreen)' ],
		[ 'blogFooterLinkColor', 'var(--pink)' ],
		[ 'blogFooterLinkColor', 'var(--cyan)' ],
		[ 'footnoteFocusColor', 'var(--neonGreen)' ],
		[ 'footnoteReturnBG', '(--neonGreen)' ],
		[ 'footnoteReturnColor', 'var(--black)' ],
		[ 'listMarkerColor', 'var(--greenYellow)' ],
		[ 'listMarkerColor', 'var(--greenYellow)' ],
		[ 'photoSetBorder', 'var(--blueBlack)' ],
		[ 'photoSetCaptionBG', 'var(--blueBlack)' ],
		[ 'pageFooterBG', 'var(--blueBlack)' ],
		[ 'navLinkColor', 'var(--offWhite)' ],
		[ 'navLichBGAHover', 'rgb(125,20,100)' ],
		[ 'navLichBGBHover', 'rgb(206,32,164)' ],
		[ 'navLichBGA', 'hsl(186, 100%, 24.5%)' ],
		[ 'navLichBGB', 'hsl(186, 100%, 59%)' ],
		[ 'skipLinkBG', 'var(--blueBlack)' ],
		[ 'webmentionsLinkColor', 'var(--pink)' ],
		[ 'webmentionsLinkColorHover', 'var(--cyan)' ],
		[ 'webmentionsQuoteBorder', 'var(--yellowGreen)' ],
		[ 'webmentionsSubmitBG', 'var(--green)' ],
		[ 'webmentionsActiveBG', 'var(--neonGreen)' ],
		[ 'bodyBG', 'var(--black)' ],
		[ 'selectionBG', 'var(--cyan)' ],
		[ 'selectionColor', 'var(--darkBlue)' ],
		[ 'bodyTextShadow', 'var(--blueBlack)' ],
		[ 'linkColor', 'var(--cyan)' ],
		[ 'linkColorHover', 'var(--pink)' ],
		[ 'highlightedColor', 'var(--greenYellow)' ],
		[ 'bodyTextShadowvar', 'var(--blueBlack)' ],
		[ 'pageHeadingColor', 'var(--greenYellow)' ],
		[ 'pageSubheadingColor', 'var(--yellowGreen)' ],
		[ 'codeColor', 'var(--yellowGreen)' ],
		[ 'pageHeadingColor', 'var(--greenYellow)' ],
		[ 'pageHeadingColor', 'var(--greenYellow)' ],
		[ 'bodyTextShadowvar', 'var(--black)' ],
		[ 'bookBG', 'var(--darkBlue)' ],
		[ 'bookBorder', 'var(--blueGreen)' ],
		[ 'bookFormat', 'var(--cyan)' ],
		[ 'homepagePhotoBorder', 'var(--grayBlue)' ],
		[ 'lichBGMainA', 'hsl(186, 100%, 24.5%)' ],
		[ 'lichBGMainB', 'hsl(186, 100%, 59%)' ],
		[ 'lichCrownBack', 'rgb(145,115,0)' ],
		[ 'lichCrownFront', 'rgb(255,202,0)' ],
		[ 'lichCrownRidge', 'rgb(234,147,19)' ],
		[ 'lichSkull', 'hsl(64deg 33% 84%)' ],
		[ 'lichSkullEyes', 'rgb(38,38,38)' ],
		[ 'lichSkullNose', 'rgb(38,38,38)' ],
		[ 'moonBase', '#C9C9C9' ],
		[ 'moonMid', '#C9C9C9' ],
		[ 'moonPeak', '#FFFFFF' ],
		[ 'moonShadow', '#1A2024' ],
		[ 'moonWash', '#ffe72e' ],
		[ 'mountain', 'rgb(26,32,36)' ],
		[ 'mountainGlow', 'hsl(76, 100%, 56%)' ],
		[ 'mountainShadow', 'rgb(18,18,18)' ],
		[ 'mountainSnow', 'rgb(172,172,172)' ],
		[ 'tentacle', 'hsl(204, 16%, 6%)' ],
		[ 'tentacleSucker', 'hsl(204, 16%, 6%)' ],
		[ 'tentacleUnderside', 'hsl(152, 20%, 25%)' ],
	];

	static styles = css`
		.theme-ui {
			color: white;
			position: fixed;
			top: 50%;
			left: 50%;
			width: min(80vw, 800px);
			max-height: 50vh;
			background-color: var(--blueBlack);
			border: 20px solid var(--pink);
			border-radius: 4px;
			transform: translateY(var(--themeUiTranslate, -100%)) translateX(-50%);
			opacity: var(--themeUiOpacity, 0);
			overflow-y: auto;
			z-index: 1000;
			transition: transform .2s linear, opacity .2s linear;
		}
		.theme-ui[open] {
			--themeUiTranslate: -50%;
			--themeUiOpacity: 1;
		}
		.theme-ui::backdrop {
			background-color: #111;
		}
		.note {
			font-size: 85%;
		}`;

	getCSSCustomPropIndex() {
		const stylesheets = [...document.styleSheets].filter(stylesheet => {
			if (stylesheet.href && stylesheet.href.indexOf(window.location.origin) === 0) {
				return stylesheet;
			}

			return stylesheet;
		});
		const combinedRules = stylesheets.map(sheet => {

			const sheetRules = [...sheet.cssRules].filter((rule) => rule.type === 1).map(rule => {

				const props = [ ...rule.style ].map((propName) => {
					const name = propName.trim();
					const value = rule.style.getPropertyValue(propName).trim();
					return [ name, value ];
				});

				return [ ...props ];
			});

			return sheetRules.flat().filter(rule => rule[0].indexOf('--') === 0);
		}).flat();

		return new Map(combinedRules);
	}

	saveSettings() {
		const dialog = this.renderRoot.querySelector('dialog');
		const pickers = Array.from(dialog.querySelectorAll('theme-colors')).map(p => {
			return {
				label: p.label,
				value: (p.value || p.currentValue),
			};
		});

		pickers.forEach(p => {
			window.localStorage.setItem(`theme_${p.label}`, p.value);
		});

		return pickers.map(p => `${p.label}:${p.value}`).join(';');
	}

	handleShowDialog() {
		const dialog = this.renderRoot.querySelector('dialog');
		dialog.showModal();
	}

	handleDialogCancel(event) {
		event.preventDefault();
		const dialog = this.renderRoot.querySelector('dialog');
		dialog.close('cancel');
	}

	handleDialogClose(event) {
		const dialog = this.renderRoot.querySelector('dialog');
		if (dialog.returnValue === 'cancel') {
			dialog.returnValue = [ 123 ];
		} else {
			dialog.returnValue = this.saveSettings();
			window.location.reload();
		}
	}

	getCustomPropValue(str) {
		const open = str.indexOf('(') + 1;
		const close = str.indexOf(')');
		const propName = str.slice(open, close);
		return this.documentProperties.get(propName);
	}

	getDefaultValue(str) {
		let p = str;
		if (p.indexOf('var(') === 0) {
			p = this.getCustomPropValue(str);
		}

		return new HexColor(p).toString();
	}

	getPresets() {
		const p = [];
		this.documentProperties.forEach((prop, key) => {
			if (prop.indexOf('hsl') === 0 || prop.indexOf('rgb') === 0) {
				p.push(`${key}:${new HexColor(prop).toString()}`);
			}
		});
		return p.join(';');
	}

	render() {
		return html`
			<button id="hello" @click="${this.handleShowDialog}">Customize theme</button>
			<dialog class="theme-ui" @close="${this.handleDialogClose}" @cancel="${this.handleDialogCancel}">
				<form method="dialog">
					${map(this.themeProperties, (property) => {
						const label = property[0];
						const defaultValue = this.getDefaultValue(property[1]);
						return html`<div>
							<theme-colors
								defaultValue="${defaultValue}"
								currentValue="${this.currentTheme.get(`theme_${label}`) || defaultValue}"
								label="${label}"
								presets="${this.getPresets()}"></theme-colors>
						</div>`;
					})}
					<button type="submit">Save</button>
					<button type="reset" @click="${this.handleDialogCancel}">Cancel</button>
					<p class="note">Safety first: be aware that saving will trigger a page refresh.</p>
					<p class="note">Consistency second: pressing "cancel" or the escape key will discard changes.</p>
				</form>
			</dialog>
		`;
	}
}

export function registerThemeComponent() {
	customElements.define('theme-colors', ThemeUIColorSelect);
	customElements.define('theme-ui', ThemeUI);
}

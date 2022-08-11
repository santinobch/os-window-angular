import { HashLocationStrategy } from "@angular/common";

export interface HSLA {
    h: number;
    s: number;
    l: number;
    a: number;
}

export function hexToHSL(H: string) {
    //Thanks to https://css-tricks.com/converting-color-spaces-in-javascript/
    
    // Convert hex to RGB first
    let r = 0;
    let g = 0;
    let b = 0;
    let a = 1;

    if (H.length == 4) {
        r = parseInt("0x" + H[1] + H[1], 16);
        g = parseInt("0x" + H[2] + H[2], 16);
        b = parseInt("0x" + H[3] + H[3], 16);
    } else if (H.length == 7) {
        r = parseInt("0x" + H[1] + H[2], 16);
        g = parseInt("0x" + H[3] + H[4], 16);
        b = parseInt("0x" + H[5] + H[6], 16);
    } else if (H.length == 5) {
        r = parseInt("0x" + H[1] + H[1], 16);
        g = parseInt("0x" + H[2] + H[2], 16);
        b = parseInt("0x" + H[3] + H[3], 16);
        a = parseInt("0x" + H[4] + H[4], 16);
    } else if (H.length == 9) {
        r = parseInt("0x" + H[1] + H[2], 16);
        g = parseInt("0x" + H[3] + H[4], 16);
        b = parseInt("0x" + H[5] + H[6], 16);
        a = parseInt("0x" + H[7] + H[8], 16);
    }
    // Then to HSL
    r /= 255;
    g /= 255;
    b /= 255;
    let cmin = Math.min(r,g,b),
        cmax = Math.max(r,g,b),
        delta = cmax - cmin;
  
    let hsla: HSLA = { h: 0, s: 0, l: 0, a: 0 };

    if (delta == 0)
    hsla.h = 0;
    else if (cmax == r)
    hsla.h = ((g - b) / delta) % 6;
    else if (cmax == g)
    hsla.h = (b - r) / delta + 2;
    else
    hsla.h = (r - g) / delta + 4;
  
    hsla.h = Math.round(hsla.h * 60);
  
    if (hsla.h < 0)
        hsla.h += 360;
  
    hsla.l = (cmax + cmin) / 2;
    hsla.s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * hsla.l - 1));
    hsla.s = +(hsla.s * 100).toFixed(1);
    hsla.l = +(hsla.l * 100).toFixed(1);

    
  

    if (H.length == 4 || H.length == 7) {
        hsla.a = 1;
        return hsla;
    }
    else if (H.length == 5 || H.length == 9) {
        hsla.a = +(a / 255).toFixed(3);
        return hsla;
    } else {
        console.log("error converting Hex to Hsl");
        return hsla;
    }
}
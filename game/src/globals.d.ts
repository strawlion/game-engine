
declare module '*.png' {
    const content: string
    export default content
}

declare module '*.ase' {
    const content: AsepriteData;
    export default content;

    interface AsepriteData {
        frames: Array<AsepriteFrame>;
        layers: Array<AsepriteLayer>;
        tags: Array<AsepriteTag>;
        palette?: AsepritePalette;
        fileSize: number;
        width: number;
        height: number;
        numFrames: number;
        colorDepth: number;
        numColors: number;
        pixelRatio: string;
        colorProfile: {
            type: string;
            flag: number;
            fGamma: number;
        };
    }

    
    interface AsepritePalette {
        paletteSize: number;
        firstColor: number;
        lastColor: number;
        colors: Array<AsepriteColor>;
      }
      interface AsepriteColor {
        red: number;
        green: number;
        blue: number;
        alpha: number;
        name: string;
      }
      interface AsepriteCel {
        layerIndex: number;
        xpos: number;
        ypos: number;
        opacity: number;
        celType: number;
        w: number;
        h: number;
        rawCelData: Uint8Array;
      }
      interface AsepriteTag {
        name: string;
        from: number;
        to: number;
        animDirection: string;
        color: string;
      }
      
      interface AsepriteLayer {
        flags: number;
        type: number;
        layerChildLevel: number;
        blendMode: number;
        opacity: number;
        name: string;
      }

      interface AsepriteFrame {
        bytesInFrame: number;
        frameDuration: number;
        numChunks: number;
        cels: Array<AsepriteCel>;
      }
}

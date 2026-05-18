import QRCode from "qrcode";

export class CodeGenerator {

    static async generateQRCodeBuffer(
        data: string
    ): Promise<Buffer> {

        return QRCode.toBuffer(data, {
            type: "png",   // only supported format
            margin: 1,
            width: 150,
        });

    }

}

export function generateBarCodeRandomId(length = 16) {
    const chars =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    let result = "";

    for (let i = 0; i < length; i++) {
        result += chars.charAt(
            Math.floor(Math.random() * chars.length)
        );
    }

    return result;
}
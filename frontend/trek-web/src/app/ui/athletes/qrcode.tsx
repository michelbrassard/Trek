import { useQRCode } from 'next-qrcode';

interface QRCodeProps {
    url: string
}

export default function QRCode(
    {url}: QRCodeProps 
) {
    const { SVG } = useQRCode();
    return (
        <SVG
          text={url}
          options={{
            margin: 2,
            width: 200,
            color: {
              dark: '#000000',
              light: '#FFFFFF',
            },
          }}
        />
      );
}
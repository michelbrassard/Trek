import { useQRCode } from 'next-qrcode';

interface QRCodeProps {
    url: string
}

export default function QRCode(
    {url}: QRCodeProps 
) {
    const { SVG } = useQRCode();
    return (
      <div style={{ border: '1px solid #000', display: 'inline-block' }}>
        <SVG
          text={url}
          options={{
            margin: 2,
            width: 400,
            color: {
              dark: '#000000',
              light: '#FFFFFF',
            },
          }}
        />
      </div>
      );
}
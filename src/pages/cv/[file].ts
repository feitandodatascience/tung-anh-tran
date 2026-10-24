// The CV's PDF from the export, served at /cv/<name>.pdf. No CV, no page.
import { cvPdf } from '../../lib/content';

export function getStaticPaths() {
  const pdf = cvPdf();
  return pdf ? [{ params: { file: pdf.name } }] : [];
}

export function GET() {
  const pdf = cvPdf()!;
  return new Response(new Uint8Array(pdf.bytes), {
    headers: { 'Content-Type': 'application/pdf' },
  });
}

import './global.css';
import { ApolloWrapper } from '../components/ApolloWrapper';

export const metadata = {
  title: 'Thimblely - Your Digital Companion',
  description: 'Experience seamless connectivity with Thimblely',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ApolloWrapper>{children}</ApolloWrapper>
      </body>
    </html>
  );
}

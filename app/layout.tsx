import type { Metadata } from 'next';
import { Toaster } from 'react-hot-toast';
import './globals.css';


export const metadata: Metadata = {
  title: 'TaskMaster',
  description: 'My-to-do-List!',
  icons: {
    icon: '/edit_modify.svg', 
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
        <Toaster position="top-right" toastOptions={{ duration: 2500,}}
        />
      </body>
    </html>
  );
}

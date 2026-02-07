import './globals.css';
import { AuthProvider } from '@/context/AuthContext';
import { QuizProvider } from '@/context/QuizContext';
import { Oxanium, JetBrains_Mono } from 'next/font/google';

const oxanium = Oxanium({
  subsets: ['latin'],
  variable: '--font-oxanium',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${oxanium.variable} ${jetbrainsMono.variable} min-h-screen bg-neutral-950 text-white antialiased`}
      >
        <AuthProvider>
          <QuizProvider>
            {children}
          </QuizProvider>
        </AuthProvider>
      </body>
    </html>
  );
}

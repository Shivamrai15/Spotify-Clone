/** @type {import('next').NextConfig} */
const nextConfig = {
    images :{
        remotePatterns: [
            {
              protocol: 'https',
              hostname: 'eyqibcskqqdsitifgbiz.supabase.co',
            },
          ],
    }
}

module.exports = nextConfig

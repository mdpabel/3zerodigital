import { YouTubeEmbed } from '@next/third-parties/google';

interface VideoProps {
  videoId: string;
  pageSlug?: string;
}

const Video: React.FC<VideoProps> = ({ videoId, pageSlug }) => {
  // const videoUrl = `https://www.youtube.com/embed/${videoId}`;

  return null;

  return (
    <div className='relative bg-white dark:bg-zinc-900 shadow-lg mx-auto mt-10 mb-14 rounded-lg w-full max-w-5xl h-[200px] sm:h-[350px] md:h-[500px]'>
      {/* Title Bar */}
      <div className='flex items-center border-gray-300 dark:border-zinc-700 bg-gray-100 dark:bg-zinc-800 pl-2 border-b rounded-t-lg h-[30px]'>
        <div className='bg-red-500 mr-2 rounded-full w-[12px] h-[12px]'></div>
        <div className='bg-yellow-500 mr-2 rounded-full w-[12px] h-[12px]'></div>
        <div className='bg-green-500 mr-2 rounded-full w-[12px] h-[12px]'></div>
        <span className='font-bold text-xs'>www.3zerodigital.com</span>
      </div>

      {/* URL Bar */}
      <div className='flex items-center border-gray-300 dark:border-zinc-700 bg-gray-200 dark:bg-zinc-800 pl-2 border-t border-b h-[25px] text-xs'>
        <span className='text-gray-500'>
          <span className='md:inline-block hidden'>
            https://www.3zerodigital.com/
          </span>
          {pageSlug}
        </span>
      </div>

      {/* YouTube Video Embed */}
      <div className='rounded-b-lg w-full h-full overflow-hidden'>
        {/* Mobile: Small Screen */}
        <div className='block md:hidden'>
          <YouTubeEmbed
            videoid={videoId}
            style={`width: 100%; height: 100%; max-width: unset; background-image: url(https://i.ytimg.com/vi_webp/${videoId}/mqdefault.webp); background-position: center; background-size: cover; background-repeat: no-repeat; max-height: 550px`}
          />
        </div>

        {/* Desktop: Large Screen */}
        <div className='md:block hidden'>
          <YouTubeEmbed
            videoid={videoId}
            style={`width: 100%; height: 100%; max-width: unset; background-image: url(https://i.ytimg.com/vi_webp/${videoId}/maxresdefault.webp); background-position: center; background-size: cover; background-repeat: no-repeat; max-height: 550px`}
          />
        </div>
        {/* <iframe
          className='border-none w-full h-full'
          src={videoUrl}
          title='YouTube video'
          allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
          allowFullScreen
        /> */}
      </div>
    </div>
  );
};

export default Video;

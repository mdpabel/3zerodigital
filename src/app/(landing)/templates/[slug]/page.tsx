import { notFound } from 'next/navigation';
import prisma from '../../../../../prisma/db';
import ImageCarousel from './image-carousel';
import { FaRegClock, FaRegFileAlt } from 'react-icons/fa'; // For "Recently Updated" and "Well Documented" icons
import { Button } from '@/components/ui/button';
import { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const slug = (await params).slug;
  const product = await prisma.template.findFirst({
    where: { slug },
  });

  return {
    title: product?.name,
    description: product?.description,
    alternates: {
      canonical: `/templates/${slug}`,
    },
  };
}

export async function generateStaticParams() {
  const products = await prisma.template.findMany();

  return products.map((product) => ({
    slug: product.slug,
  }));
}

const ProductDetails = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;

  // Handle if no slug or product not found
  if (!slug) {
    return notFound();
  }

  const product = await prisma.template.findFirst({
    where: { slug },
    include: {
      categories: {
        select: {
          category: true,
        },
      }, // Include related categories
    },
  });

  if (!product) {
    return notFound();
  }

  return (
    <div className='relative mx-auto px-4 py-10 w-full max-w-5xl container'>
      {/* Top Section: Product Name, Recently Updated, Well Documented */}
      <div className='flex md:flex-row flex-col justify-between items-start'>
        <div className='mb-6 md:mb-0'>
          <h1 className='font-semibold text-gray-800 dark:text-white text-3xl'>
            {product.name}
          </h1>

          {/* Displaying Multiple Categories */}
          <p className='mt-2 text-gray-500 text-lg'>
            {product.categories
              .map((category) => category.category.name)
              .join(', ')}
          </p>
        </div>

        <div className='flex items-center space-x-6'>
          <div className='flex items-center space-x-2'>
            <FaRegClock className='text-gray-500' />
            <span className='text-gray-500 text-sm'>Recently Updated</span>
          </div>
          <div className='flex items-center space-x-2'>
            <FaRegFileAlt className='text-gray-500' />
            <span className='text-gray-500 text-sm'>Well Documented</span>
          </div>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className='gap-10 grid grid-cols-1 lg:grid-cols-5 mt-8'>
        {/* Left Section: Image Carousel */}
        <div className='lg:col-span-3'>
          <div className='mb-8'>
            <ImageCarousel images={product.images} />
          </div>
        </div>

        {/* Right Section: Pricing Table */}
        <div className='lg:col-span-2'>
          <div className='bg-gray-900 shadow-lg p-6 rounded-lg'>
            <h2 className='mb-4 font-semibold text-white text-xl'>Pricing</h2>

            <div className='space-y-4'>
              <div className='flex justify-between items-center'>
                <span className='text-gray-200 text-lg'>Price</span>
                <p className='font-bold text-white text-3xl'>
                  ${product.salePrice.toFixed(2)}
                </p>
              </div>

              {/* Sale Price Section */}
              {product.salePrice > 0 && (
                <div className='flex justify-between items-center'>
                  <span className='text-gray-200 text-lg line-through'>
                    ${product.price.toFixed(2)}
                  </span>
                  <p className='font-bold text-red-400 text-2xl'>
                    {`Save $${(product.price - product.salePrice).toFixed(2)} `}
                    <span className='text-gray-300 text-sm'>
                      (
                      {(
                        ((product.price - product.salePrice) / product.price) *
                        100
                      ).toFixed(0)}
                      %)
                    </span>
                  </p>
                </div>
              )}

              {/* Pricing Badge */}
              <div className='mt-4'>
                <span className='bg-yellow-500 px-3 py-1 rounded-full text-white text-sm'>
                  Best Value
                </span>
              </div>

              {/* Checkout Button */}
              <div className='mt-6'>Place Order</div>
            </div>
          </div>
        </div>
      </div>

      {/* Links Section */}
      <div className='mt-10'>
        <h2 className='font-semibold text-gray-800 dark:text-white text-xl'>
          Links
        </h2>
        <div className='mt-2'>
          <a
            href={product.fileUrl}
            target='_blank'
            className='text-blue-600 hover:text-blue-800 dark:hover:text-blue-500 dark:text-blue-400'
            rel='noopener noreferrer'>
            Live Preview
          </a>
        </div>
      </div>

      {/* Product Description */}
      <div className='mt-10'>
        <h2 className='font-semibold text-gray-800 dark:text-white text-2xl'>
          Description
        </h2>
        <div
          className='dark:prose-invert mt-4 max-w-full prose'
          dangerouslySetInnerHTML={{ __html: product.description || '' }}
        />
      </div>
    </div>
  );
};

export default ProductDetails;

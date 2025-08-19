import Link from 'next/link'

const Simple = () => {
  return (
    <section className='bg-simple-bg relative before:absolute before:w-full before:h-full before:bg-arrow-bg before:bg-no-repeat before:top-10'>
      <div className=''>
        <div className='container relative z-10'>
          <div className='max-w-2xl mx-auto'>
            <h2 className='text-center font-semibold mb-6 sm:leading-16 capitalize'>
              A Simple, Secure Way to Find Lost Items and Pets
            </h2>
            <p className='text-center text-lightpurple text-lg font-normal mb-8'>
              TagSync makes it easy to recover your missing belongings and pets using QR technology.
              Attach a TagSync QR tag and anyone who finds your lost item or pet can quickly contact you for a safe return.
            </p>
          </div>
          <div className='flex justify-center '>
            <Link
              href={'/'}
              className='text-xl font-semibold text-white py-4 px-6 lg:px-12 bg-linear-to-r from-primary to-secondary hover:from-secondary hover:to-primary rounded-xl cursor-pointer'>
              Get Your TagSync QR Tag
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Simple

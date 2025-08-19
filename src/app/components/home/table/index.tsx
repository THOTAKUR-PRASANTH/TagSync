import Image from 'next/image'

interface TagSyncTable {
  index: number
  name: string
  type: string
  status: string
  lastSeen: string
  action: string
  imgSrc: string
}

const tableData: TagSyncTable[] = [
  {
    index: 1,
    name: 'Bella',
    type: 'Pet (Dog)',
    imgSrc: '/images/table/dog.svg',
    status: 'Missing',
    lastSeen: 'Central Park',
    action: 'View Tag',
  },
  {
    index: 2,
    name: 'Wallet',
    type: 'Item',
    imgSrc: '/images/table/wallet.svg',
    status: 'Found',
    lastSeen: 'Coffee Shop',
    action: 'Contact Owner',
  },
  {
    index: 3,
    name: 'Max',
    type: 'Pet (Cat)',
    imgSrc: '/images/table/cat.svg',
    status: 'Missing',
    lastSeen: 'Elm Street',
    action: 'View Tag',
  },
  {
    index: 4,
    name: 'Backpack',
    type: 'Item',
    imgSrc: '/images/table/backpack.svg',
    status: 'Found',
    lastSeen: 'Library',
    action: 'Contact Owner',
  },
]

const Table = () => {
  return (
    <section id='exchange-section' className='scroll-mt-20'>
      <div className='container'>
        <div className='rounded-2xl bg-tablebg p-8 relative z-10 overflow-hidden'>
          <p className='text-white/80 text-2xl'>TagSync Live Item & Pet Status</p>
          <div className='overflow-x-scroll lg:overflow-auto'>
            <table className='table-auto w-full mt-10 border border-border'>
              <thead>
                <tr className='text-white bg-border rounded-2xl'>
                  <th className='px-4 py-4 font-normal rounded-s-lg'>#</th>
                  <th className='px-4 py-4 text-start font-normal'>NAME</th>
                  <th className='px-4 py-4 font-normal'>TYPE</th>
                  <th className='px-4 py-4 font-normal'>STATUS</th>
                  <th className='px-4 py-4 font-normal'>LAST SEEN</th>
                  <th className='px-4 py-4 font-normal rounded-e-lg'>ACTION</th>
                </tr>
              </thead>
              <tbody>
                {tableData.map((items, i) => (
                  <tr key={i} className='border-b border-b-border'>
                    <td className='px-4 py-6 text-center text-white'>
                      {items.index}
                    </td>
                    <td className='px-4 py-6 text-center text-white flex items-center justify-start gap-5 '>
                      <Image
                        src={items.imgSrc}
                        alt={items.name}
                        height={50}
                        width={50}
                      />
                      {items.name}
                    </td>
                    <td className='px-4 py-6 text-center text-white'>
                      {items.type}
                    </td>
                    <td
                      className={`px-4 py-6 text-center ${
                        items.status === 'Missing' ? 'text-primary' : 'text-secondary'
                      } `}>
                      {items.status}
                    </td>
                    <td className='px-4 py-6 text-center text-white'>
                      {items.lastSeen}
                    </td>
                    <td
                      className={`px-4 py-6 text-center ${
                        items.action === 'Contact Owner'
                          ? 'text-secondary'
                          : 'text-primary'
                      }`}>
                      {items.action}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Image
        src={'/images/table/Untitled.svg'}
        alt='ellipse'
        width={2460}
        height={102}
      />
    </section>
  )
}

export default Table

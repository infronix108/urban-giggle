import Image from "next/image"

const awards = [
  {
    id: 1,
    name: "Best Luxury Service Provider 2023",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=200&h=200",
    organization: "Global Luxury Awards",
  },
  {
    id: 2,
    name: "Innovation in Digital Services 2023",
    image: "https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?auto=format&fit=crop&q=80&w=200&h=200",
    organization: "Tech Excellence Awards",
  },
  {
    id: 3,
    name: "Customer Satisfaction Leader 2023",
    image: "https://images.unsplash.com/photo-1579548122080-c35fd6820ecb?auto=format&fit=crop&q=80&w=200&h=200",
    organization: "Consumer Choice Awards",
  },
]

export default function Awards() {
  return (
    <section className="py-16 bg-deep-blue">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-electric-blue">Our Accolades</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {awards.map((award) => (
            <div key={award.id} className="flex flex-col items-center text-center">
              <Image
                src={award.image || "/placeholder.svg"}
                alt={award.name}
                width={100}
                height={100}
                className="mb-4"
              />
              <h3 className="text-xl font-semibold text-white mb-2">{award.name}</h3>
              <p className="text-sm text-gray-400">{award.organization}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}


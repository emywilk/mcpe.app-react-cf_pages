export default function PageLayout({ title, description, children }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto max-w-6xl px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-4 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
            {title}
          </h1>
          {description && (
            <div className="text-xl text-gray-600">
              {description}
            </div>
          )}
        </div>
        {children}
      </div>
    </div>
  );
}

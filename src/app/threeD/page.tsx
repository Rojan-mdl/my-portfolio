import ThreeDModel from "@/components/ThreeDModel";

export default function ThreeDPage() {
    return (
      <section>
        <h2 className="text-3xl font-bold mb-6">3D Portfolio</h2>
        <p className="mb-4">Coming soon – my 3D work (renderings, animations) will be showcased here.</p>
  
        {/* Example 3D Project Card */}
        <div className="border rounded p-4 mb-4">
          <h3 className="text-xl font-semibold">3D Project Title</h3>
          <ThreeDModel />
          <p className="text-gray-600">Short description of the 3D project.</p>
        </div>
      </section>
    );
  }
  
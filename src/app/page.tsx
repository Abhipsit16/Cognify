import Features from "@/components/features";

export default function Home() {
  const features=[
    {name: "Data Analysis and Insights", text: "AI-driven insights to help you make smarter decisions."},
    {name: "Data Visualisation", text: "Turn your data into interactive visual trends."},
    {name: "Data Sharing", text:"Seamlessly share data with the world."},
    {name: "Collaboration", text:"Real-time chatrooms to interact with organizations and collaborate on your data."},
  ]
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-self-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] mt-64">
      <div>
        <span>
        <h1 className="text-orange-200 text-5xl">
          Empowering Data, Amplifying Insights, Unlocking Potential
        </h1>
        <p className="text-white text-2xl justify-self-center mt-2">Leverage AI to organize, analyze, and visualize your data.</p>
        </span>
      </div>
      <span className="text-orange-400 text-5xl justify-self-center">Why Cognify?</span>
      <div className="container mx-auto px-8 py-16 mt-2">
      <div className="flex gap-12">
        {
          features.map(feature=>(
            <Features 
            name= {feature.name}
            text= {feature.text}
            />
          ))
        }
      </div>
      </div>
    </div>
  );
}

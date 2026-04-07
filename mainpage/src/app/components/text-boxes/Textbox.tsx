import { useInView } from "framer-motion"


const Textbox = ({children, title}: {children: React.ReactNode, title: string}) => {
    
  return (
        <div id="textbox" className="bg-gray-500 bg-opacity-5 flex flex-col py-5 px-5 items-center rounded-2xl relative">
          <div className="flex-col flex items-start space-y-6">
            <h1 className="text-[110px] font-bold">
              {title}
            </h1>
            <h1 className="text-[30px] font-bold flex flex-col relative w-3/4">
              {children}
            </h1>
          </div>
        </div>
    );
};

export default Textbox;
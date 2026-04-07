import LoginBackground from "@/app/(auth)/login/components/LoginBackground";

type input = {
    children: React.ReactNode
    className?: string
}

const TextboxContainer = ({children, className}: input) => {

    return (
         <div id="textbox" className={`w-full rounded-[20px] bg-gray-500 bg-opacity-20 ${className}`}>
            {children}
        </div>
    );
};

export default TextboxContainer;
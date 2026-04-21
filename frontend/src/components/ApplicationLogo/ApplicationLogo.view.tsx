import { Link } from "react-router-dom";

const ApplicationLogoView = () => {
  return (
    <Link to="/">
      <div className="flex items-center space-x-3 text-black dark:text-white">
        {/* Image Logo - Properly Sized */}
        <img 
          src="/react.svg"
          alt="Mental Health App Logo"
          className="h-8 w-8 object-contain"
        />
        <span className="font-semibold text-lg hidden sm:inline">Medical diagnostic AI</span>
      </div>
    </Link>
  );
};

export default ApplicationLogoView;

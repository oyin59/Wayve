import {Link} from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div> 
        <h1 className="text-3xl font-serif text-[#432F2E] mb-4">Hey, sorry but page not found</h1>
        <p className="text-sm text-[#432F2E]/70 italic">The page you are looking for does not exist.</p>
        <Link to={"/"} className="text-sm text-[#432F2E]/70 italic"> <button> Go back to home</button></Link>
    </div>
  );
};

export default NotFoundPage;
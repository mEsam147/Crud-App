import { motion } from "framer-motion";
import { LogOut } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../Store/UseAuthStore";
const Navbar = () => {
  const { user, logout } = useAuthStore();
  return (
    <motion.div
      initial={{ opacity: 0, y: -30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.5 }}
      className="shadow-md py-3 "
    >
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          <Link
            to={"/"}
            className="text-xl font-semibold text-slate-700 hover:scale-105 transition-all duration-150 active:scale-95"
          >
            CRUD APP
          </Link>
          <div className=" items-center gap-x-5  flex">
            {!user ? (
              <>
                <Link
                  to={"/login"}
                  className="btn btn-xs md:btn-sm btn-info text-primary "
                >
                  login
                </Link>
                <Link
                  to={"/register"}
                  className="btn btn-xs md:btn-sm btn-success text-primary "
                >
                  sign up
                </Link>
              </>
            ) : (
              <motion.button
                whileTap={{
                  scale: 0.8,
                }}
                className="btn btn-sm btn-danger text-primary flex items-center"
                onClick={() => logout()}
              >
                <LogOut />
                logout
              </motion.button>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Navbar;

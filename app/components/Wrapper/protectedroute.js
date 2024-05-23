import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/app/context/auth";

const withProtectedRoute = (WrappedComponent) => {
  return (props) => {
    // const { user } = useContext(AuthContext);
    const user = localStorage.getItem("user_id");
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
      setIsLoading(true);
      if (user === null) {
        router.push("/login");
      } else {
        setIsLoading(false);
      }
    }, [user, router]);

    if (isLoading) {
      return <div>Loading...</div>;
    }

    return <WrappedComponent {...props} />;
  };
};

export default withProtectedRoute;

"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

const Success = () => {
  const router = useRouter();
  const [canShow, setCanShow] = useState(false);
  useEffect(() => {
    const registeration_success = Cookies.get("registeration_success");
    if (!registeration_success) {
      return router.replace("/");
    }
    if (registeration_success != "true") {
      return router.replace("/");
    }
    setCanShow(true);
  }, []);

  if (!canShow) return null;
  return (
    <div className="mt-24 flex-col">
      <h1 className="text-4xl font-medium mb-4">Thank you</h1>
      <p className="text-lg leading-snug">
        After approving the information.. We will send you the entry card via
        email or WhatsApp (as specified)
      </p>
    </div>
  );
};

export default Success;

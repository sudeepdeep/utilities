/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import Cookies from "js-cookie";
export async function checkUserPurchasedTool(toolId: any) {
  const userId: any = Cookies.get("userId");
  const token: any = Cookies.get("accessToken");
  let isPurchased: any = false;
  if (token) {
    await axios
      .get(`https://omni-backend-lake.vercel.app/user/${userId}/my-profile`, {
        headers: { Authorization: "Bearer " + token },
      })
      .then((res) => {
        console.log(res);
        if (res.data && res.data.user) {
          const userData = res.data.user;
          if (userData && toolId) {
            if (userData.purchasedItems && userData.purchasedItems.length > 0) {
              console.log("inside");
              const isUserPurchased = userData.purchasedItems.find(
                (item: any) => item == toolId
              );
              console.log("isUserPurchased", isUserPurchased);
              if (isUserPurchased) {
                isPurchased = true;
              } else {
                isPurchased = false;
              }
              console.log(isPurchased);
            }
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });

    return isPurchased;
  }
}

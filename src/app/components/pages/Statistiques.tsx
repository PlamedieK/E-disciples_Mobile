import { useAuth } from "@/Context/AuthContext";
import { useTheme } from "@/Context/ThemeContext";
import { searchDisciple } from "@/services/appelApi";
import { useEffect, useState } from "react";
import SearchFetch from "../Search/SearchFetch";

const Statistiques = () => {
  const { ip, token } = useAuth();
  //const { theme } = useTheme();
  const [searchQuery, setSearchQuery] = useState("");
  const [resultatQuery, setResultatQuery] = useState<any[] | null>([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    if (searchQuery === "") {
      return;
    }
    const delayDebounceFn = setTimeout(() => {
      searchDisciple({
        ip,
        token,
        searchQuery,
        setResultatQuery,
        setIsLoading,
      });
    }, 500);
      return () => clearTimeout(delayDebounceFn)
  }, [ip, searchQuery, token]);
  return (
    <>
      <SearchFetch searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      {/* <Text>Statistiques</Text> */}
    </>
  );
};

export default Statistiques;

// <SearchFetch
//     searchQuery={searchQuery}
//     setModalVisible={setModalVisible}
//     setSearchQuery={setSearchQuery}
//   />

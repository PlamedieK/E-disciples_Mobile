import { useAuth } from "@/Context/AuthContext";
import { searhPartageBiblique } from "@/services/appelApi";
import { useEffect, useState } from "react";
import FormDisciples from "../modals/FormDisciples";
import SearchFetch from "../Search/SearchFetch";

const Disciples = () => {
  //const { theme } = useTheme();
  const { ip, token } = useAuth();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [modalVisible, setModalVisible] = useState(false);
  const [, setIsLoading] = useState(false);
  const [, setResultatQuery] = useState<any[] | null>([]);

  useEffect(() => {
    if (searchQuery.trim() === "") {
      //setResultatQuery([])
      return;
    }
    const delayDebounceFn = setTimeout(() => {
      searhPartageBiblique({
        searchQuery,
        setIsLoading,
        setResultatQuery,
        ip,
        token,
      });
    }, 500);
    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery, ip, token]);
  return (
    <>
      <SearchFetch
        searchQuery={searchQuery}
        setModalVisible={setModalVisible}
        setSearchQuery={setSearchQuery}
      />
      {/* Inclusion de la Modal FormDisciples */}
      <FormDisciples
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
    </>
  );
};

export default Disciples;

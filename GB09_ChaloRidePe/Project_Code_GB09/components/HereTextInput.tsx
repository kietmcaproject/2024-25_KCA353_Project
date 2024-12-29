// For Here Maps API and Places auto completion

// import React, { useState } from "react";
// import {
//   View,
//   Image,
//   TextInput,
//   FlatList,
//   TouchableOpacity,
//   Text,
// } from "react-native";
// import { icons } from "@/constants";
// import { GoogleInputProps } from "@/types/type";

// // You should store your Here Maps API key in your environment variables
// const hereApiKey = process.env.EXPO_PUBLIC_HERE_MAPS_API_KEY;

// const HereTextInput = ({
//   icon,
//   initialLocation,
//   containerStyle,
//   textInputBackgroundColor,
//   handlePress,
// }: GoogleInputProps) => {
//   const [suggestions, setSuggestions] = useState([]);
//   const [query, setQuery] = useState("");

//   const fetchAutocompleteSuggestions = async (input: string) => {
//     const url = `https://autocomplete.search.hereapi.com/v1/autocomplete?q=${input}&apiKey=${hereApiKey}`;
//     try {
//       const response = await fetch(url);
//       const data = await response.json();
//       setSuggestions(data.items || []);
//     } catch (error) {
//       console.error("Error fetching Here Autocomplete suggestions", error);
//     }
//   };

//   const handleSelectSuggestion = (suggestion: any) => {
//     console.log(suggestion);
//     const { position, address } = suggestion;
//     if (position && position.lat && position.lng) {
//       handlePress({
//         latitude: position.lat,
//         longitude: position.lng,
//         address: address.label,
//       });
//       setQuery(address.label);
//       setSuggestions([]); // Clear suggestions after selection
//     } else {
//       console.warn("Position data is missing for the selected suggestion.");
//     }
//   };

//   return (
//     <View
//       className={`flex flex-row items-center justify-center relative z-50 rounded-xl ${containerStyle}`}
//     >
//       <View className="justify-center items-center w-6 h-6 ml-3">
//         <Image
//           source={icon ? icon : icons.search}
//           className="w-6 h-6"
//           resizeMode="contain"
//         />
//       </View>
//       <View style={{ flex: 1 }}>
//         <TextInput
//           placeholder={initialLocation ?? "Where do you want to go?"}
//           value={query}
//           onChangeText={(text) => {
//             setQuery(text);
//             fetchAutocompleteSuggestions(text);
//           }}
//           style={{
//             backgroundColor: textInputBackgroundColor || "white",
//             fontSize: 16,
//             fontWeight: "600",
//             marginTop: 5,
//             padding: 10,
//             borderRadius: 20,
//             width: "100%",
//           }}
//           placeholderTextColor="gray"
//         />
//         {suggestions.length > 0 && (
//           <FlatList
//             data={suggestions}
//             renderItem={({ item }) => (
//               <TouchableOpacity onPress={() => handleSelectSuggestion(item)}>
//                 <View
//                   style={{
//                     padding: 10,
//                     borderBottomWidth: 1,
//                     borderBottomColor: "#ddd",
//                   }}
//                 >
//                   <Text>{item.address.label}</Text>
//                 </View>
//               </TouchableOpacity>
//             )}
//             keyExtractor={(item) => item.id}
//             style={{
//               backgroundColor: textInputBackgroundColor || "white",
//               position: "absolute",
//               top: 60,
//               width: "100%",
//               borderRadius: 10,
//               shadowColor: "#d4d4d4",
//               zIndex: 99,
//             }}
//           />
//         )}
//       </View>
//     </View>
//   );
// };

// export default HereTextInput;

import React, { useState } from "react";
import {
  View,
  Image,
  TextInput,
  FlatList,
  TouchableOpacity,
  Text,
} from "react-native";
import { icons } from "@/constants";
import { GoogleInputProps } from "@/types/type";

const hereApiKey = process.env.EXPO_PUBLIC_HERE_MAPS_API_KEY;

const HereTextInput = ({
  icon,
  initialLocation,
  containerStyle,
  textInputBackgroundColor,
  handlePress,
}: GoogleInputProps) => {
  const [suggestions, setSuggestions] = useState([]);
  const [query, setQuery] = useState("");

  const fetchAutocompleteSuggestions = async (input: string) => {
    const url = `https://autocomplete.search.hereapi.com/v1/autocomplete?q=${input}&apiKey=${hereApiKey}`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      // console.log("Suggestions: ", data);  // error: "too many requests", description: "rate limit for this service has been reached"
      setSuggestions(data.items || []);
    } catch (error) {
      console.error("Error fetching Here Autocomplete suggestions", error);
    }
  };

  const fetchCoordinates = async (address: string) => {
    const geocodeUrl = `https://geocode.search.hereapi.com/v1/geocode?q=${encodeURIComponent(
      address
    )}&apiKey=${hereApiKey}`;
    try {
      const response = await fetch(geocodeUrl);
      const data = await response.json();
      const position = data.items[0]?.position;
      return position;
    } catch (error) {
      console.error("Error fetching coordinates for the address", error);
      return null;
    }
  };

  const handleSelectSuggestion = async (suggestion: any) => {
    const { address, title } = suggestion;

    // Attempt to fetch coordinates via geocoding
    const position = await fetchCoordinates(title || address.label);

    if (position) {
      handlePress({
        latitude: position.lat,
        longitude: position.lng,
        address: address.label,
      });
      setQuery(address.label);
      setSuggestions([]); // Clear suggestions after selection
    } else {
      console.warn("Could not fetch coordinates for the selected suggestion.");
    }
  };

  return (
    <View
      className={`flex flex-row items-center justify-center relative z-50 rounded-xl ${containerStyle}`}
    >
      <View className="justify-center items-center w-6 h-6 ml-3">
        <Image
          source={icon ? icon : icons.search}
          className="w-6 h-6"
          resizeMode="contain"
        />
      </View>
      <View style={{ flex: 1 }}>
        <TextInput
          placeholder={initialLocation ?? "Where do you want to go?"}
          value={query}
          onChangeText={(text) => {
            setQuery(text);
            fetchAutocompleteSuggestions(text);
          }}
          style={{
            backgroundColor: textInputBackgroundColor || "white",
            fontSize: 16,
            fontWeight: "600",
            marginTop: 5,
            padding: 10,
            borderRadius: 20,
            width: "100%",
          }}
          placeholderTextColor="gray"
        />
      </View>
      {/* It can be after line 246 */}
      {suggestions.length > 0 && (
        <FlatList
          data={suggestions}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleSelectSuggestion(item)}>
              <View
                style={{
                  padding: 10,
                  borderBottomWidth: 1,
                  borderBottomColor: "#ddd",
                }}
              >
                <Text>{item.address?.label}</Text>
              </View>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id}
          style={{
            backgroundColor: "white",
            position: "absolute",
            top: 60,
            width: "100%",
            borderRadius: 10,
            shadowColor: "#d4d4d4",
            zIndex: 99,
            elevation: 5,
          }}
        />
      )}
    </View>
  );
};

export default HereTextInput;

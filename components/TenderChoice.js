import { Image, Text, View } from "react-native";

const TenderChoice = ({type}) => {
    return (
        <View >
            <Image 
              style={{width:100, height:100, }} 
              source={type ==="LIKE" ? require('../assets/tickMark.png') : require("../assets/crossMark.png") } 
            />
        </View>
    );
}
export default TenderChoice;

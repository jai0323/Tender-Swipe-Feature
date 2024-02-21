import { useCallback } from "react";
import { Animated, Dimensions, StyleSheet, Text, View } from "react-native";
import TenderChoice from "./TenderChoice";

const TenderCard = ({item, isFirst, swipe, ...rest})=> {

    const rotate = swipe.x.interpolate({
        inputRange: [-100, 0, 100],
        outputRange: [ '-8deg', '0deg', '8deg']
    });

    const LikeOpacity = swipe.x.interpolate({
        inputRange: [10, 100],
        outputRange: [0, 1],
        extrapolate: 'clamp'
    });

    const NopeOpacity = swipe.x.interpolate({
        inputRange: [-100, -10],
        outputRange: [1, 0],
        extrapolate: 'clamp'
    });
 
    const tenderSelection = useCallback( () => {
        return(
            <>
            <Animated.View style={{position:'absolute', 
                top: 50,
                left:20,
                opacity: LikeOpacity,
                 }}>
                <TenderChoice type="LIKE"/>
            </Animated.View>
            <Animated.View style={{position:'absolute', 
                top: 50,
                right:20,
                opacity: NopeOpacity,
                 }}>
                <TenderChoice type="NOPE"/>
            </Animated.View>
            </>
        )
    },[])

    return (
        
<Animated.View 
    style={[
        styles.card,
        { backgroundColor: item.color}, 
        isFirst && {transform: [...swipe.getTranslateTransform(),{ rotate:rotate}]}
        ]}
        {...rest}
        >
        {isFirst && tenderSelection()}
</Animated.View>
    )
}

export default TenderCard;

const {width, height} = Dimensions.get("window");

const styles = StyleSheet.create({
    card:{
        width: width-30,
        height: height - 200,
        borderRadius: 20,
        alignSelf: 'center',
        position: "absolute",
        top:100,
        
        
       
    }
})
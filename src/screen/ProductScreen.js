import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { productId } from '../services/Index'
import ProductData from './component/ProductData'

const ProductScreen = () => {
    const [showProductId, setShowProductId] = useState([])
    const [isLoader, setIsLoader] = useState(false)


    const getProductId = async () => {
        setIsLoader(true)
        try {
            const result = await productId()
            setShowProductId(result)
            setIsLoader(false)

        } catch (error) {
            console.log(error)
            setIsLoader(false)

        }
    }

    useEffect(() => {
        getProductId()
    }, [])

    useEffect(() => {
        const updateCountdown = () => {
            const updatedData = showProductId.map(item => {
                let timeInSeconds = item.timeInSeconds;
                let hours = Math.floor(timeInSeconds / 3600);
                let minutes = Math.floor((timeInSeconds % 3600) / 60);
                let seconds = timeInSeconds % 60;

                if (timeInSeconds > 0 && !item.isPaused) {
                    timeInSeconds -= 1;
                }

                return {
                    ...item,
                    timeInSeconds,
                    formattedTime: `${hours.toString().padStart(2, 0)}:${minutes.toString().padStart(2, 0)}:${seconds.toString().padStart(2, '0')}`,
                };
            });
            setShowProductId(updatedData);
        };

        const countdownInterval = setInterval(updateCountdown, 1000);

        return () => clearInterval(countdownInterval);
    }, [showProductId]);

    const resetCountdown = (productId) => {
        const updatedData = showProductId.map(item => {
            if (item.productId === productId) {
                return {
                    ...item,
                    timeInSeconds: 5,
                    isPaused: false,
                };
            }
            return item;
        });
        setShowProductId(updatedData);
    };

    const togglePause = (productId) => {
        const pauseItem = showProductId.map(item => {
            if (item.productId === productId) {
                return {
                    ...item,
                    isPaused: !item.isPaused,
                };
            }
            return item

        });
        setShowProductId(pauseItem);
    };

    const Divider = () => {
        return (
            <View style={styles.dividerLine} />
        )
    }
    if(isLoader){
        return  <View style={styles.loaderBox}>
             <ActivityIndicator size="small" color="#0000ff" />
        </View>
    }
    return (
        <View style={styles.mainContainer}>
            <Text style={styles.headerText}>List Of Products</Text>

            <FlatList
                data={showProductId}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => {
                    return (
                        <ProductData item={item} resetCountdown={resetCountdown} togglePause={togglePause} />
                    )
                }}
                ItemSeparatorComponent={Divider}
            />
        </View>
    )
}

export default ProductScreen

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        paddingTop: 45,
        paddingHorizontal: 15
    },
    headerText: {
        fontSize: 18,
        fontWeight: '600',
        textAlign: "center",
        marginBottom: 20
    },
    dividerLine: {
        borderBottomWidth: 5,
        marginBottom: 10
    },
    loaderBox:{
        flex:1,
        alignItems:"center",
        justifyContent:"center"
    }
})
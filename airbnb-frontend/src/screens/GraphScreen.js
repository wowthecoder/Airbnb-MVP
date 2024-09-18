import { StyleSheet, Text, ScrollView, View, TouchableHighlight, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { useNavigation } from "@react-navigation/native";

const months = ["Dec", "Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sep", "Oct", "Nov"];

const GraphScreen = () => {   
    const navigation = useNavigation();

    const backToMap = () => {
        navigation.navigate('MainMap');
    }

    const propertyValues = () => {
        const min = 10;
        const max = 100;
        return Array.from({ length: 10 }, () => Math.random() * (max - min) + min);
    }

    const incomeCashValues = () => {
        return propertyValues();
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableHighlight style={styles.backButton} underlayColor='green' onPress={backToMap}>
                    <Text style={styles.backText}>{'<'} Back</Text>
                </TouchableHighlight>
                <Text style={styles.title}>Your Financial Data</Text>
            </View>

            <ScrollView showsVerticalScrollIndicator={true} style={styles.container}>
                <Text style={styles.graphTitle}>Property values over time</Text>
                <View style={styles.chartContainer}>
                    <Text style={[styles.yAxisLabel, styles.propYAxisLabel]}>Property Value (£)</Text>
                    <LineChart
                        data={{
                        labels: months,
                        datasets: [
                            {
                                data: propertyValues(),
                                color: () => `rgba(134, 65, 244, 1)`,
                                strokeWidth: 2,
                            },
                            {
                                data: propertyValues(),
                                color: () => `rgba(34, 193, 195, 1)`,
                                strokeWidth: 2,
                            },
                            {
                                data: propertyValues(),
                                color: () => `rgba(255, 165, 0, 1)`,
                                strokeWidth: 2,
                            },
                            {
                                data: propertyValues(),
                                color: () => `rgba(220, 20, 60, 1)`,
                                strokeWidth: 2,
                            },
                        ],
                        }}
                        width={Dimensions.get("window").width * 0.8 }
                        height={Dimensions.get("window").height * 0.8}
                        yAxisInterval={1} // optional, defaults to 1
                        chartConfig={{
                            backgroundGradientFrom: "white",
                            backgroundGradientTo: "white",
                            decimalPlaces: 2, // optional, defaults to 2dp
                            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                            style: {
                                borderRadius: 16,
                            },
                            propsForDots: {
                                r: "6",
                            },
                            
                            /* Adjusts the fill of the chart */
                            fillShadowGradient: 'transparent',
                            fillShadowGradientOpacity: 0,
                            fillShadowGradientFromOffset: 0,
                            fillShadowGradientTo: 'transparent',
                            fillShadowGradientToOpacity: 0,
                        }}
                        style={{
                            alignItems: 'center',
                        }}
                    />
                    <View style={[styles.legendContainer, styles.propLegend]}>
                        <View style={[styles.legendItem, styles.propLegendItem]}>
                            <View style={[styles.legendDash, { backgroundColor: 'rgba(134, 65, 244, 1)' }]} />
                            <Text style={styles.legendText}>Property 1</Text>
                        </View>
                        <View style={[styles.legendItem, styles.propLegendItem]}>
                            <View style={[styles.legendDash, { backgroundColor: 'rgba(34, 193, 195, 1)' }]} />
                            <Text style={styles.legendText}>Property 2</Text>
                        </View>
                        <View style={[styles.legendItem, styles.propLegendItem]}>
                            <View style={[styles.legendDash, { backgroundColor: 'rgba(255, 165, 0, 1)' }]} />
                            <Text style={styles.legendText}>Property 3</Text>
                        </View>
                        <View style={[styles.legendItem, styles.propLegendItem]}>
                            <View style={[styles.legendDash, { backgroundColor: 'rgba(220, 20, 60, 1)' }]} />
                            <Text style={styles.legendText}>Property 4</Text>
                        </View>
                    </View>
                </View>

                <Text style={styles.graphTitle}>Monthly Rental Income and Net Cash Flow</Text>
                <View style={styles.chartContainer}>
                    <Text style={[styles.yAxisLabel, styles.cashYAxisLabel]}>Amount (£)</Text>
                    <LineChart
                        data={{
                        labels: months,
                        datasets: [
                            {
                                data: incomeCashValues(),
                                color: () => `rgba(134, 65, 244, 1)`,
                                strokeWidth: 2,
                            },
                            {
                                data: incomeCashValues(),
                                color: () => `rgba(34, 193, 195, 1)`,
                                strokeWidth: 2,
                            },
                        ],
                        }}
                        width={Dimensions.get("window").width * 0.8 }
                        height={Dimensions.get("window").height * 0.8}
                        yAxisInterval={1} // optional, defaults to 1
                        chartConfig={{
                            backgroundGradientFrom: "white",
                            backgroundGradientTo: "white",
                            decimalPlaces: 2, // optional, defaults to 2dp
                            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                            style: {
                                borderRadius: 16,
                            },
                            propsForDots: {
                                r: "6",
                            },
                            
                            /* Adjusts the fill of the chart */
                            fillShadowGradient: 'transparent',
                            fillShadowGradientOpacity: 0,
                            fillShadowGradientFromOffset: 0,
                            fillShadowGradientTo: 'transparent',
                            fillShadowGradientToOpacity: 0,
                        }}
                        style={{
                            alignItems: 'center',
                        }}
                    />
                    <View style={[styles.legendContainer, styles.cashLegend]}>
                        <View style={styles.legendItem}>
                            <View style={[styles.legendDash, { backgroundColor: 'rgba(134, 65, 244, 1)' }]} />
                            <Text style={styles.legendText}>Monthly Rental Income</Text>
                        </View>
                        <View style={styles.legendItem}>
                            <View style={[styles.legendDash, { backgroundColor: 'rgba(34, 193, 195, 1)' }]} />
                            <Text style={styles.legendText}>Net Cash Flow</Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        width: '100%',
        height: '15%',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    backButton: {
        width: "15%",
        height: "90%",
        borderRadius: 10,
        backgroundColor: 'royalblue',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: '1%',
    },
    backText: {
        color: 'white',
        fontSize: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'black',
        marginLeft: '20%',
    },
    graphTitle: {
        fontSize: 18,
        color: 'black',
        textAlign: 'center',
        marginTop: '1%',
    }, 
    chartContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        overflow: 'hidden',
    },
    yAxisLabel: {
        position: 'absolute',
        top: "40%",
        fontSize: 14,
        transform: [{ rotate: '-90deg' }], // Rotate the text to be vertical
        textAlign: 'center',
    },
    propYAxisLabel: {
        left: "-2%",
    },
    cashYAxisLabel: {
        left: "2%",
    },
    legendContainer: {
        backgroundColor: 'white',
        borderWidth: 2,
        padding: 10,
        position: 'absolute',
        top: 0,
        left: '19%',
        opacity: 0.7,
        justifyContent: 'center',
    },
    propLegend: {
        height: "25%",
    },
    cashLegend: {
        height: "20%",
    },
    legendItem: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    propLegendItem: {
        marginBottom: -5,
    },
    legendDash: {
        width: 20,  // Length of the dash
        height: 4,  // Thickness of the dash
        marginRight: 8,
    },
    legendText: {
        fontSize: 12,
    },
});

export default GraphScreen;
import React from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';

const MonthlySummaryBox = ({ guests, income, expenses, propertyValues, onStayCurrentMonth, onGoNextMonth }) => {
  return (
    <View style={styles.container}>
      {/* Display the statistics in a table-like structure */}
      <View style={styles.table}>
        {/* Header Row */}
        <View style={styles.tableRow}>
          <Text style={[styles.tableHeader, styles.propertyCell]}>Property 1</Text>
          <Text style={[styles.tableHeader, styles.propertyCell]}>Property 2</Text>
          <Text style={[styles.tableHeader, styles.propertyCell]}>Property 3</Text>
        </View>
        
        {/* Guests Row */}
        <View style={styles.tableRow}>
          <Text style={styles.tableCell}>{guests[0]} guests</Text>
          <Text style={styles.tableCell}>{guests[1]} guests</Text>
          <Text style={styles.tableCell}>{guests[2]} guests</Text>
        </View>

        {/* Property Values Row */}
        <View style={styles.tableRow}>
          <Text style={styles.tableCell}>Value: ${propertyValues[0]}</Text>
          <Text style={styles.tableCell}>Value: ${propertyValues[1]}</Text>
          <Text style={styles.tableCell}>Value: ${propertyValues[2]}</Text>
        </View>

        {/* Income and Expenses Row (Merged Cell) */}
        <View style={styles.tableRow}>
          <Text style={[styles.tableCell, styles.mergedCell]}>{`Income: $${income}\nExpenses: $${expenses}`}</Text>
        </View>
      </View>

      {/* Buttons: Stay in Current Month and Go to Next Month */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={[styles.button, styles.redButton]} onPress={onStayCurrentMonth}>
          <Text style={styles.buttonText}>Stay in current month</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.blueButton]} onPress={onGoNextMonth}>
          <Text style={styles.buttonText}>Go to next month</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

// Styles for the component
const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  table: {
    marginBottom: 20,
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  tableHeader: {
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
  tableCell: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    textAlign: 'center',
    fontSize: 14,
    flex: 1,
  },
  propertyCell: {
    flex: 1,
  },
  mergedCell: {
    flex: 3, // Merge the entire row into one cell
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    marginHorizontal: 5,
    alignItems: 'center',
    borderRadius: 5,
  },
  redButton: {
    backgroundColor: 'red',
  },
  blueButton: {
    backgroundColor: 'blue',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default MonthlySummaryBox;
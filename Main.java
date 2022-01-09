import java.util.*;

public class Main {
  public static void main(String[] args) {
    ArrayList<ArrayList<Integer>> arr = new ArrayList<>();
    
    for(int i = 0; i < 3; i++) {
      ArrayList<Integer> row = new ArrayList<>();
      for(int j = 0; j < 5; j++ ){ 
        row.add(j);
        arr.add(row);
      }
      row = new ArrayList<>();
      for (int j = 0; j < 6; j++) {
        row.add(j);
        arr.add(row);
      }
      
    }
    System.out.println(arr);
  }
}
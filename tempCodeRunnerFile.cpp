#include <bits/stdc++.h>

#define speed ios_base::sync_with_stdio(false); \
              cin.tie(0)                        
#define F0R(p, n) for(int i = p; i <= n; i++)
    using namespace std;
using ll = long long;

int query(int a, int b, int c) {
  cout << "? " << a << " " << b << " " << c << endl;
  int ans;
  cin >> ans;
  return ans;
}

int main() {
  speed;
  int t, n;
  cin >> t;
  while (t--) {
    cin >> n;
    int ans1 = query(1, 2, 3);
    vector<int> mark(n + 1, -1);
    int r, y;
    for (int i = 2; i <= n - 2; i++) {
      int ans2 = query(i, i + 1, i + 2);
      if (ans1 != ans2) {
        mark[i - 1] = ans1;
        mark[i + 2] = ans2;
        r = i - 1;
        y = i + 2;
        break;
      }
    }
    vector<int> res;
    F0R(1, n) {
      if (mark[i] == -1) {
        mark[i] = query(r, y, i);
      }
      if (mark[i] == 0) res.push_back(i);
    }
    cout << "! " << res.size() << " ";
    for (int r : res) 
      cout << r << " ";
    cout << endl;
  }
}
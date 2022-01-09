#include <bits/stdc++.h>

using namespace std;

int rx(int a, int b, int c) {
  cout << "? " << a << " " << b << " " << c << "\n";
  cout << flush;
  int ans;
  cin >> ans;
  return ans;
}

int main() {
  ios_base::sync_with_stdio(false);
  cin.tie(0);
  int t, n;

  cin >> t;
  while (t--) {
    cin >> n;
    int ans1 = rx(1, 2, 3);
    vector<int> mark(n + 1, -1);
    int x, y;
    for (int i = 2; i <= n - 2; i++) {
      int ans2 = rx(i, i + 1, i + 2);
      if (ans1 != ans2) {
        mark[i - 1] = ans1;
        mark[i + 2] = ans2;
        x = i - 1;
        y = i + 2;
        break;
      }
    }
    vector<int> res;
    for (int i = 1; i <= n; i++) {
      if (mark[i] == -1) {
        mark[i] = rx(x, y, i);
      }
      if (mark[i] == 0) res.push_back(i);
    }
    cout << "! " << res.size() << " ";
    for (int x : res) cout << x << " ";
    cout << "\n";
    cout << flush;
  }

  return 0;
}
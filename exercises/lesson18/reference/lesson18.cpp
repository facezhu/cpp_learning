#include <algorithm>
#include <iostream>
#include <vector>
int main()
{
    std::vector<int> health{30,0,80,10,0};
    health.erase(std::remove_if(health.begin(),health.end(),[](int hp){ return hp<=0; }),health.end());
    std::sort(health.begin(),health.end(),[](int a,int b){ return a>b; });
    for(int hp:health) std::cout<<hp<<" ";
    std::cout<<"\nAlive: "<<health.size()<<"\n";
}

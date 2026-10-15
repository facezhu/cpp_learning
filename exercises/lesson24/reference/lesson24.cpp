#include <iostream>
double simulate(int frames,double dt)
{
    const double speed=6.0;
    double position=0.0;
    for(int i=0;i<frames;++i) position+=speed*dt;
    return position;
}
int main()
{
    std::cout<<"30 FPS: "<<simulate(30,1.0/30)<<"\n";
    std::cout<<"60 FPS: "<<simulate(60,1.0/60)<<"\n";
}

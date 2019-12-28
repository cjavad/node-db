#include <cjson/cJSON.h>
#include <stdio.h>

int main()
{
  char json[] = '{"name": "Jack (\"Bee\") Nimble","format": {"type":"rect","width":1920,"height":1080,"interlace":  false,"frame rate": 24}}';
  printf(json);
}

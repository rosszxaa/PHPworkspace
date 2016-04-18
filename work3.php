<?php
   $v1=$_GET['num1'];
    $v2=$_GET['num2'];
    if($v1>=152 and $v1<=158){
     if($v2>=80 and $v2<92){
     echo '建议穿S';
     }else if($v2>=92 and $v2<105)
        {echo '建议穿M';
    }else if($v2>=105 and $v2<115)
             {echo '建议穿L';
         }else if($v2>=115 and $v2<125)
                 { echo '建议穿XL';
              }

              }else if($v1>=158 and $v1<=165){

               if($v2>=90 and $v2<98){
                   echo '建议穿S';
                   }else if($v2>=98 and $v2<108)
                      {echo '建议穿M';
                  }else if($v2>=108 and $v2<118)
                           {echo '建议穿L';
                       }else if($v2>=118 and $v2<128)
                               { echo '建议穿XL';
                            }

             }else if($v1>=165 and $v1<=170){

                              if($v2>=98 and $v2<108)
                                    {echo '建议穿M';
                                }else if($v2>=108 and $v2<118)
                                         {echo '建议穿L';
                                     }else if($v2>=118 and $v2<130)
                                             { echo '建议穿XL';
                                          }

                           }
?>
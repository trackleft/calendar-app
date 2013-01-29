<div itemscope itemtype="http://data-vocabulary.org/Event">
<a href="<?php print $node->url; ?>" itemprop="url" >
   <span itemprop="summary"><?php print $node->title; ?></span>
  </a>
   <img itemprop="photo" src="img/1.jpg>" />

  <span itemprop="description"><?php print $node->description; ?></span>

//  See if an event is all day or not

  When:
  <time itemprop="startDate" datetime="<?php print $node->start_date_ISO; ?>"><?php print $node->start_time_AP; ?></time>—

//see if an event has an end date, if yes print, if no print start date.

  <time itemprop="endDate" datetime="<?php print $node->end_date_ISO; ?>"><?php print $node->start_time_AP; ?></time>

  Where:
  ​<span itemprop="location" itemscope itemtype="http://data-vocabulary.org/​Organization">
     ​<span itemprop="name"><?php print $node->location_building; ?></span>
     ​<span itemprop="address" itemscope itemtype="http://data-vocabulary.org/Address">
         <span itemprop="street-address"><?php print $node->location_building_address_1; ?></span>, 
         <span itemprop="street-address-2"><?php print $node->location_building_address_2; ?></span>, 
         <span itemprop="locality"><?php print $node->location_building_address_city; ?></span>, 
         <span itemprop="region"><?php print $node->location_building_address_state; ?></span>
     </span>
     <span itemprop="geo" itemscope itemtype="http://data-vocabulary.org/​Geo">
        <meta itemprop="latitude" content="<?php print $node->location_building_address_lat; ?>" />
        <meta itemprop="longitude" content="<?php print $node->location_building_address_lon; ?>" />
     </span>
  </span>

//foreach through categories.

 Category: <span itemprop="eventType">Concert</span>
            <span itemprop="eventType">Concert</span>
            <span itemprop="eventType">Concert</span>
            <span itemprop="eventType">Concert</span>


// We don't currently take ticket URLS

  <span itemprop="ticketAggregate" itemscope itemtype="http://data-vocabulary.org/Offer-aggregate"> 
    Tickets from $<span itemprop="lowPrice">10.00</span>-$<span itemprop="highPrice">11.00</span>
    <span itemprop="currency" content="USD" /> 
    <span itemprop="offerCount">2,000</span> tickets available
    <a href="http://www.example.com/events/spinaltap/alltickets" itemprop="offerurl">
      http://google.com/ticket</span>See all available tickets</a>
  </span>
  <span itemprop="tickets" itemscope itemtype="http://data-vocabulary.org/Offer"> 
    <a href="http://www.example.com/events/spinaltap/presale" itemprop="offerurl">Presale tickets</a> 
    <span itemprop="price">$10</span><span itemprop="currency" content="USD" /> 
      till <time itemprop="priceValidUntil" datetime="2015-11-10">10 November 2015</time> 
      (<span itemprop="quantity">1000</span> available)  
  </span> 
  <span itemprop="tickets" itemscope itemtype="http://data-vocabulary.org/Offer"> 
    <a href="http://www.example.com/events/spinaltap/tickets" itemprop="offerurl">Full-price tickets</a> 
    <span itemprop="price">$11</span><span itemprop="currency" content="USD" /> 
  </span>
</div>
